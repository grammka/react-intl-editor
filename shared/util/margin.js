
const n = (key, x) => typeof x === 'number' ? { [key]: x } : null

function margin (props) {
  const { m, mx, my, mt, mr, mb, ml } = props || {}

  const result = {
    ...n('margin', m),
    ...n('marginTop', mt),
    ...n('marginBottom', mb),
    ...n('marginTop', my),
    ...n('marginBottom', my),
    ...n('marginLeft', ml),
    ...n('marginRight', mr),
    ...n('marginLeft', mx),
    ...n('marginRight', mx)
  }

  return result
}


export default margin
