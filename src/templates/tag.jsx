import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import { useIntl } from "gatsby-plugin-intl";
import PageTitle from "../components/PageTitle";
import PostListing from "../components/PostListing";
import Layout from "../components/Layout";
import config from "../data/site-data";

const TagTemplate = ({ pageContext, data: { posts, categories, tags }, location }) => {
  const { tag } = pageContext;
  const postEdges = posts.edges;
  const intl = useIntl();

  return (
    <Layout
      location={location}
      title={tag.charAt(0).toUpperCase() + tag.slice(1)}
    >
      <Helmet>
        <title>{`Blog | Tag: ${tag} | ${config.siteTitle}`}</title>
        <link rel="canonical" href={`${config.siteUrl}/${intl.locale}/blog/tags/${tag}`} />
      </Helmet>

      <div id="blog-container" className="tertiary_bg">

        <PageTitle title="Blog" subtitle1="Tag" subtitle2={tag} />

        <div id="page_content">
          <PostListing postEdges={postEdges} categoriesEdges={categories.edges} tagsEdges={tags.edges} location={location} />
        </div>

      </div>
    </Layout>
  );
}

export default TagTemplate;

export const pageQuery = graphql`
  query TagPage($tag: String) {
    posts: allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            category
            language
            date
          }
        }
      }
    }
    categories: allMarkdownRemark {
      edges {
        node {
          frontmatter {
            language
            category
          }
        }
      }
    }
    tags: allMarkdownRemark {
      edges {
        node {
          frontmatter {
            language
            tags
          }
        }
      }
    }
  }
`;
