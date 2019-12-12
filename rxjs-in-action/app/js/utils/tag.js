/**
 *  RxJS 반응형 프로그래밍
 *  Chapter #
 *  @author Paul Daniels
 *  @author Luis Atencio
 */
export function buildTag(tagName, options, transform = x => x) {
  return (source) => {
    const attrs = [];
    for (let k in options) {
      options.hasOwnProperty(k) && attrs.push(`${k}="${options[k]}"`);
    }

    return `<${tagName} ${attrs.join(' ')}>${transform(source)}</${tagName}>`;
  };
}