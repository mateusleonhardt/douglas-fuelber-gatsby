import _ from "lodash";
import Avatar from "react-md/lib/Avatars";
import Button from "react-md/lib/Buttons";
import Card from "react-md/lib/Cards";
import CardText from "react-md/lib/Cards/CardText";
import CardTitle from "react-md/lib/Cards/CardTitle";
import config from "../../data/SiteConfig";
import DisqusArea from "../components/Disqus";
import FontIcon from "react-md/lib/FontIcons";
import { graphql, Link } from "gatsby";
import Helmet from "react-helmet";
import Layout from "../layout";
import Media, { MediaOverlay } from "react-md/lib/Media";
import moment from "moment";
import PostTags from "../components/PostTags";
import PostCover from "../components/PostCover";
import PostSuggestions from "../components/PostSuggestions";
import React from "react";
import SEO from "../components/SEO";
import SocialLinks from "../components/SocialLinks";
import UserInfo from "../components/UserInfo";

import "./b16-tomorrow-dark.css";
import "./post.scss";

export default class PostTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: true
    };
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    if (window.innerWidth >= 640) {
      this.setState({ mobile: false });
    } else {
      this.setState({ mobile: true });
    }
  }

  render() {
    const { mobile } = this.state;
    const { slug } = this.props.pageContext;
    const expanded = !mobile;
    const postOverlapClass = mobile ? "post-overlap-mobile" : "post-overlap";
    const postNode = this.props.data.markdownRemark;
    const post = postNode.frontmatter;
    if (!post.id) {
      post.id = slug;
    }
    if (!post.category_id) {
      post.category_id = config.postDefaultCategoryID;
    }

    const coverHeight = mobile ? 180 : 350;
    return (
      <Layout location={this.props.location}>

        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
          <link rel="canonical" href={`${config.siteUrl}${post.id}`} />
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />

        <div id="post-wrapper" className="tertiary_bg">

          <div id="page_title" className="md-grid md-cell--8">
            <Link style={{ textDecoration: "none" }} to="/blog/">
              <h2 className="left-border-area light-border title">Blog</h2>
            </Link>
          </div>

          <div id="page_content">
          <div className="primary_bg card-wrapper">
            <Card className="post md-grid md-cell--8">

              <Media style={{ height: coverHeight, paddingBottom: "0px" }}>
                <PostCover postNode={postNode} coverHeight={coverHeight} />
                <MediaOverlay>
                  <div className="md-card-title md-card-title--primary post-title">
                    <h1 className="md-card-title--title md-card-title--large md-text">{post.title}</h1>
                  </div>
                </MediaOverlay>
              </Media>

              <div className="md-grid">
                <CardTitle
                  className="post-description md-cell--6"
                  avatar={<Avatar icon={<FontIcon iconClassName="fa fa-calendar" />} />}
                  title={`Publicado em ${moment(post.date).format(
                    config.dateFormat
                  )}`}
                  subtitle={`${postNode.timeToRead} minutos de leitura`}>
                </CardTitle>
                <Link
                    className="category-link md-cell--6"
                    to={`/blog/categorias/${_.kebabCase(post.category)}`}>
                    <CardTitle
                      className="post-description"
                      avatar={
                        <Avatar icon={<FontIcon iconClassName="fa fa-folder-open" />} />
                      }
                      title="Na categoria"
                      subtitle={post.category}
                    />
                </Link>
                <CardText className="post-info md-cell--12">
                  <div className="post-body" dangerouslySetInnerHTML={{ __html: postNode.html }} />
                </CardText>
                <CardText className="post-meta md-cell--12">
                  <PostTags tags={post.tags} />
                  <SocialLinks
                    postPath={slug}
                    postNode={postNode}
                    mobile={this.state.mobile}
                  />
                </CardText>

              </div>            
            </Card>
            <UserInfo
              className="md-grid md-cell md-cell--12"
              config={config}
              expanded={expanded}
            />
            <DisqusArea postNode={postNode} expanded={expanded} />

            <div className="md-grid post-back">
              <Link className="md-cell--center" to={`blog/`}>
                <Button className="secondary-button">
                  Voltar para o Blog
                </Button>
              </Link>          
            </div>
          </div>
          </div>
          
        </div>

        {/*<PostSuggestions postNode={postNode} />*/}
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        date
        category
        tags
      }
      fields {
        nextTitle
        nextSlug
        prevTitle
        prevSlug
        slug
        date
      }
    }
  }
`;
