export const lazyLoading = (lazyLoadingCallback, loaderRef) => {
  const observer = new IntersectionObserver(lazyLoadingCallback, { threshold: 0.1 })
  observer.observe(loaderRef)
}