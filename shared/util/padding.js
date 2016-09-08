
const n = (key, x) => typeof x === 'number' ? { [key]: x } : null

function padding (props) {
  const { p, px, py, pt, pr, pb, pl } = props || {}
  
  const result = {
    ...n('padding', p),
    ...n('paddingTop', pt),
    ...n('paddingBottom', pb),
    ...n('paddingTop', py),
    ...n('paddingBottom', py),
    ...n('paddingLeft', pl),
    ...n('paddingRight', pr),
    ...n('paddingLeft', px),
    ...n('paddingRight', px)
  }

  return result
}


export default padding
