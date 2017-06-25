class Configs {
  static NoItemError = '没有找到合适的...';
  static MonthError = '搜索串有误：月份超出地球月范围。';
  static DayError = '搜索串有误：日期超出地球日范围。';
  static TimeOrderError = '搜索串有误：时间顺序[key]错误。';

  static RegExpStr = {
    year: 'Y(\\d{4}|\\d{2})(?:-(\\d{4}|\\d{2}))?',
    month: 'M(\\d{2}|\\d)(?:-(\\d{2}|\\d))?',
    day: 'D(\\d{2}|\\d)(?:-(\\d{2}|\\d))?',
  };
}

function _analysis(str) {
  let splitRegItems = [' +'], keys = Object.keys(Configs.RegExpStr), ret = new AnalysisResult();
  for (let index = 0; index < keys.length; index++) {
    let i, key = keys[index], reg = Configs.RegExpStr[key];
    let matched = str.match(new RegExp(reg));
    if (matched) {

      let retProp = ret[key];
      for (i = 1; i < matched.length; i++) {

        if (matched[i] === undefined) {
          continue;
        }

        if (key === 'year' && matched[i].length === 2) {
          matched[i] = '20' + matched[i];
        }

        let parsed = parseInt(matched[i], 10);

        if (key === 'month' && (parsed < 1 || parsed > 12)) {
          return {
            error: Configs.MonthError
          };
        }
        if (key === 'day' && (parsed < 1 || parsed > 31)) {
          return {
            error: Configs.DayError
          };
        }

        retProp[i === 1 ? 'start' : 'end'] = parsed;
      }

      if (!!retProp.end && retProp.end < retProp.start) {
        return {
          error: Configs.TimeOrderError.replace('key', key)
        };
      }

      matched = str.match(new RegExp(reg, 'g'));
      if (matched) {
        for (i = 0; i < matched.length; i++) {
          splitRegItems.push(matched[i]);
        }
      }
    }
  }

  ret.keyWords = str.split(new RegExp(splitRegItems.join('|'))).filter(function (kw) {
    return kw !== '';
  }).reduce(function (p, v) {
    for (let i = 0; i < p.length; i++) {
      if (p[i] === v) {
        return p;
      }
    }
    p.push(v);
    return p;
  }, []);

  return {
    ret: ret
  };
}

function analysis(searchStr) {
  let ret = null;
  const idx = searchStr.indexOf(':');
  if (-1 === idx) {
    ret = _analysis(searchStr);
    return {
      error: ret.error,
      category: ret.ret
    };
  } else {
    const categoryStr = searchStr.substr(0, idx);
    const postStr = searchStr.substr(idx + 1);

    if ('A' === categoryStr) {
      ret = _analysis(postStr);
      return {
        error: ret.error,
        post: ret.ret
      };
    } else {
      ret = _analysis(categoryStr);
      const ret2 = _analysis(postStr);
      return {
        error: ret.error || ret2.error,
        category: ret.ret,
        post: ret2.ret
      };
    }
  }
}

export class AnalysisResult {
  year = new Period();
  month = new Period();
  day = new Period();
  keyWords;
}

export class Period {
  start = null;
  end = null;
}

export default analysis;