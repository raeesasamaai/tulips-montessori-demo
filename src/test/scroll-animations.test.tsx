import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ScrollAnimations } from "@/components/site/ScrollAnimations";

describe("Scroll animations", () => {
  const observe = vi.fn();
  const unobserve = vi.fn();
  const disconnect = vi.fn();
  let notify: IntersectionObserverCallback;
  let motion: MediaQueryList;

  beforeEach(() => {
    vi.clearAllMocks();
    motion = Object.assign(new EventTarget(), { matches: false }) as MediaQueryList;
    vi.spyOn(window, "matchMedia").mockReturnValue(motion);
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe = observe;
        unobserve = unobserve;
        disconnect = disconnect;
        constructor(callback: IntersectionObserverCallback) {
          notify = callback;
        }
      },
    );
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("reveals only intersecting content and stops observing it after entry", () => {
    const { unmount } = render(
      <>
        <ScrollAnimations />
        <p data-reveal>First</p>
        <p data-reveal>Second</p>
      </>,
    );
    const first = screen.getByText("First");
    const second = screen.getByText("Second");
    expect(first).toHaveAttribute("data-reveal-state", "pending");
    expect(second).toHaveAttribute("data-reveal-state", "pending");
    expect(second.style.getPropertyValue("--reveal-delay")).toBe("40ms");

    act(() =>
      notify(
        [
          { target: first, isIntersecting: true } as IntersectionObserverEntry,
          { target: second, isIntersecting: false } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      ),
    );

    expect(first).toHaveAttribute("data-reveal-state", "visible");
    expect(second).toHaveAttribute("data-reveal-state", "pending");
    expect(unobserve).toHaveBeenCalledWith(first);
    unmount();
    expect(disconnect).toHaveBeenCalled();
    expect(second).not.toHaveAttribute("data-reveal-state");
  });

  it("keeps content visible for reduced motion, including preference changes", () => {
    render(
      <>
        <ScrollAnimations />
        <p data-reveal>Content</p>
      </>,
    );
    const content = screen.getByText("Content");
    Object.defineProperty(motion, "matches", { value: true, configurable: true });
    act(() => {
      motion.dispatchEvent(new Event("change"));
    });
    expect(content).toHaveAttribute("data-reveal-state", "visible");

    cleanup();
    observe.mockClear();
    render(
      <>
        <ScrollAnimations />
        <p data-reveal>Reduced motion</p>
      </>,
    );
    expect(screen.getByText("Reduced motion")).toHaveAttribute("data-reveal-state", "visible");
    expect(observe).not.toHaveBeenCalled();
  });

  it("observes newly mounted interactive content", async () => {
    const { rerender } = render(<ScrollAnimations />);
    await act(async () => {
      rerender(
        <>
          <ScrollAnimations />
          <nav data-reveal>Mobile navigation</nav>
        </>,
      );
    });
    const menu = screen.getByText("Mobile navigation");
    expect(observe).toHaveBeenCalledWith(menu);
    expect(menu).toHaveAttribute("data-reveal-state", "pending");
  });

  it("leaves content untouched when scroll observation is unavailable", () => {
    Reflect.deleteProperty(window, "IntersectionObserver");
    render(
      <>
        <ScrollAnimations />
        <p data-reveal>Visible without animation</p>
      </>,
    );
    expect(screen.getByText("Visible without animation")).not.toHaveAttribute("data-reveal-state");
  });

  it("animates a grouped block once even if its children have reveal markers", () => {
    render(
      <>
        <ScrollAnimations />
        <div data-reveal="group">
          <p data-reveal>Grouped text</p>
        </div>
      </>,
    );
    const text = screen.getByText("Grouped text");
    expect(observe).toHaveBeenCalledWith(text.parentElement);
    expect(observe).not.toHaveBeenCalledWith(text);
    expect(text).not.toHaveAttribute("data-reveal-state");
  });

  it("starts an entrance once before the element reaches the screen", () => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      top: window.innerHeight + 40,
      bottom: window.innerHeight + 140,
    } as DOMRect);
    render(
      <>
        <ScrollAnimations />
        <p data-reveal>Incoming content</p>
      </>,
    );
    const element = screen.getByText("Incoming content");
    const entries = [{ target: element, isIntersecting: true } as IntersectionObserverEntry];
    act(() => notify(entries, {} as IntersectionObserver));
    expect(element).toHaveAttribute("data-reveal-animate", "true");
    act(() => notify(entries, {} as IntersectionObserver));
    expect(unobserve).toHaveBeenCalledTimes(1);
  });

  it("does not fade out content already visible when the page loads", () => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      top: 100,
      bottom: 200,
    } as DOMRect);
    render(
      <>
        <ScrollAnimations />
        <p data-reveal>Already visible</p>
      </>,
    );
    const element = screen.getByText("Already visible");
    expect(element).toHaveAttribute("data-reveal-state", "visible");
    expect(element).not.toHaveAttribute("data-reveal-animate");
    expect(observe).not.toHaveBeenCalled();
  });

  it("skips the fade if fast scrolling has already brought content into view", () => {
    const bounds = vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      top: window.innerHeight + 100,
      bottom: window.innerHeight + 200,
    } as DOMRect);
    render(
      <>
        <ScrollAnimations />
        <p data-reveal>Fast scroll</p>
      </>,
    );
    const element = screen.getByText("Fast scroll");
    bounds.mockReturnValue({ top: 100, bottom: 200 } as DOMRect);
    act(() =>
      notify(
        [{ target: element, isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      ),
    );
    expect(element).toHaveAttribute("data-reveal-state", "visible");
    expect(element).not.toHaveAttribute("data-reveal-animate");
  });
});
