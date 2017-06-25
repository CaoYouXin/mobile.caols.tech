import { post } from './base';

const formatBody = (ar) => {
  return {
    yearStart: ar.year.start,
    yearEnd: ar.year.end,
    monthStart: ar.month.start,
    monthEnd: ar.month.end,
    dayStart: ar.day.start,
    dayEnd: ar.day.end,
    keywords: ar.keyWords,
    platform: 'All,Pc'
  }
}

const formatType = (type) => (response) => {
  return {
    type,
    response
  }
}

const search = (analysisResult) => {
  const categoryAR = analysisResult.category;
  const postAR = analysisResult.post;

  if (!categoryAR) {
    return post(`http://${document.domain}:8080/blog_api/search/post`, formatBody(postAR)).then(formatType('post'));
  } else {
    if (!postAR) {
      return post(`http://${document.domain}:8080/blog_api/search/category`, formatBody(categoryAR)).then(formatType('category'));
    } else {
      return post(`http://${document.domain}:8080/blog_api/search/post_with_category`, {
        category: formatBody(categoryAR),
        post: formatBody(postAR)
      }).then(formatType('post'));
    }
  }
}

export { search };