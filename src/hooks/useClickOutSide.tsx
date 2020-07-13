import { RefObject, useEffect } from "react"

function useClickOutSide(ref: RefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // ref.current.contains(event.target) 
      // 把最外层的 wrapper 是否包含里面的元素，包含就算返回；
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return
      }
      handler(event)
    }
    document.addEventListener('click', listener)
    return () => {
      document.removeEventListener('click', listener)
    }
  })
}
export default useClickOutSide