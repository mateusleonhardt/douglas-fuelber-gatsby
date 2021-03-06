import React from "react";
import { StaticQuery, graphql } from "gatsby";
import PostCover from "./PostCoverComponent";

const queryWrapper = ({ postNode, coverHeight, coverClassName }) => {

    return (
      <StaticQuery
        query={graphql`
          query CoverQuery {
            allFile {
              edges {
                node {
                  id
                  absolutePath
                  childImageSharp {
                    id
                    resolutions {
                      base64
                      tracedSVG
                      aspectRatio
                      width
                      height
                      src
                      srcSet
                      srcWebp
                      srcSetWebp
                      originalName
                    }
                    internal {
                      contentDigest
                      type
                      owner
                    }
                    fluid(maxWidth: 1240) {
                      ...GatsbyImageSharpFluid
                      originalName
                    }
                  }
                }
              }
            }
          }
        `}
        render={data => (
          <PostCover
            fileEdges={data.allFile.edges}
            postNode={postNode}
            coverHeight={coverHeight}
            coverClassName={coverClassName}
          />
        )}
      />
    );  
}

export default queryWrapper;