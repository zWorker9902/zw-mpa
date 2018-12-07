
/**
 * 节流方法：
 * 应用场景：onmousemove操作优化处理
 * @param(function) fn  节流后需要执行的方法
 * @param(object) context 选项对象
 * @param(number) delay number 执行间隔
 * @param(string) text string 选项对象
 * @param(number) maxApplyTime number 最大间隔时间
 * @param(object) params 回掉参数 
 * */
export function throttle(fn, context, delay, maxApplyTime, params = {} ) {
  clearTimeout(fn.timer);
  fn.current = Date.now();
  if (!fn.start) {
    fn.start = fn.current;
  }
  // 两次执行时间间隔大于最大间隔时间时，立即调用处理函数
  if (fn.current - fn.start > maxApplyTime) {
    fn.call(context, params);
    fn.start = fn.current;
  } else {
    fn.timer = setTimeout(() => {
      fn.call(context, params);
    }, delay);
  }
}
/**
 * 防抖动方法：应用场景：输入框onchange搜索数据
 * @param(function) fn  防抖动后需要执行的方法
 * @param(object) context 选项对象
 * @param(number) delay  执行间隔
 * @param(object) params  回掉参数
 * */
export function debounce(fn, context, delay, params = {}) {
  clearTimeout(fn.timer);
  fn.timer = setTimeout(() => {
    fn.apply(context, [params]);
  }, delay);
}

export function arrayClearRepeat(source) {
  const result = [];
  const hash = {};
  for (let i = 0, item; (item = source[i]) != null; i += 1) {
    if (!hash[item]) {
      result.push(item);
      hash[item] = true;
    }
  }
  return result;
}