export const lazyLoading = (lazyLoadingCallback, target: Element) => {
  const observer = new IntersectionObserver(lazyLoadingCallback, { threshold: 0.1 })
  observer.observe(target)
}