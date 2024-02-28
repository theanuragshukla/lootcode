const solutionQuery = `
  query communitySolutions($questionSlug: String!, $skip: Int!, $first: Int!, $query: String, $orderBy: TopicSortingOption, $languageTags: [String!], $topicTags: [String!]) {
  questionSolutions(
    filters: {questionSlug: $questionSlug, skip: $skip, first: $first, query: $query, orderBy: $orderBy, languageTags: $languageTags, topicTags: $topicTags}
  ) {
    hasDirectResults
    totalNum
    solutions {
      id
      title
      commentCount
      topLevelCommentCount
      viewCount
      pinned
      isFavorite
      solutionTags {
        name
        slug
      }
      post {
        id
        status
        voteStatus
        voteCount
        creationDate
        isHidden
        author {
          username
          isActive
          nameColor
          activeBadge {
            displayName
            icon
          }
          profile {
            userAvatar
            reputation
          }
        }
      }
      searchMeta {
        content
        contentType
        commentAuthor {
          username
        }
        replyAuthor {
          username
        }
        highlights
      }
    }
  }
}`;

const slug2IdQuery = `
query questionTitle($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    questionId
    questionFrontendId
    title
    titleSlug
    isPaidOnly
    difficulty
    likes
    dislikes
    categoryTitle
  }
}
`;

const solutionByIdQuery = `
query communitySolution($topicId: Int!) {
  topic(id: $topicId) {
    id
    viewCount
    topLevelCommentCount
    subscribed
    title
    pinned
    solutionTags {
      name
      slug
    }
    hideFromTrending
    commentCount
    isFavorite
    post {
      id
      voteCount
      voteStatus
      content
      updationDate
      creationDate
      status
      isHidden
      author {
        isDiscussAdmin
        isDiscussStaff
        username
        nameColor
        activeBadge {
          displayName
          icon
        }
        profile {
          userAvatar
          reputation
        }
        isActive
      }
      authorIsModerator
      isOwnPost
    }
  }
}
`;

export { solutionQuery, slug2IdQuery, solutionByIdQuery };
