import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article>
          <h1 class="post__title">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
          <content
            class="post__content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
        <hr />

        <ul style={{
          marginTop: '3rem',
          marginRight: 0,
          marginLeft: 0,
          padding: 0,
          listStyleType: 'none'
        }}>
          {previous && (
            <li>
              <Link
                to={previous.fields.slug} rel="prev"
                dangerouslySetInnerHTML={{ __html: `← ${previous.frontmatter.title}` }}
              />
            </li>
          )}

          {next && (
            <li>
              <Link
                to={next.fields.slug}
                rel="next"
                dangerouslySetInnerHTML={{ __html: `${next.frontmatter.title} →` }}
              />
            </li>
          )}
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
