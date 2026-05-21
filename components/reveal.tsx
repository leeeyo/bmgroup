"use client";

import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type RevealProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  /** Animation delay in milliseconds. */
  delay?: number;
  /** Trigger only once (default) or every time the element re-enters the viewport. */
  once?: boolean;
  /** Margin around the root to expand/shrink the intersection box. */
  rootMargin?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/**
 * Lightweight reveal-on-scroll wrapper.
 *
 * Replaces `motion.div whileInView` for entrance animations so framer-motion
 * doesn't have to load just to fade an element up. Animation is pure CSS,
 * driven by adding `.is-visible` once the element intersects the viewport.
 * Respects `prefers-reduced-motion` via the rule in globals.css.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  children,
  className = "",
  delay = 0,
  once = true,
  rootMargin = "-90px 0px",
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [once, rootMargin]);

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal-on-view${visible ? " is-visible" : ""}${
        className ? ` ${className}` : ""
      }`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
