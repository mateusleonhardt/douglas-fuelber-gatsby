import React from "react";
import { useIntl } from "gatsby-plugin-intl"
import {
  FacebookShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookShareCount,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
  WhatsappIcon,
  LinkedinIcon
} from "react-share";
import urljoin from "url-join";
import config from "../../data/site-data";
import "./SocialLinks.scss";

export default ({ postNode, postPath, mobile }) => {

  const intl = useIntl();

  const post = postNode.frontmatter;
  const url = urljoin(config.siteUrl, intl.locale, config.blogPrefix, postPath);
  const iconSize = mobile ? 36 : 48;
  const filter = count => (count > 0 ? count : "");
  const renderShareCount = count => (
    <div className="share-count">{filter(count)}</div>
  );

  return (
    <div className="social-links">
      <LinkedinShareButton url={url}>
        <LinkedinIcon round size={iconSize} />
      </LinkedinShareButton>
      <FacebookShareButton url={url} quote={postNode.excerpt}>
        <FacebookIcon round size={iconSize} />
        <FacebookShareCount url={url}>
          {count => renderShareCount(count)}
        </FacebookShareCount>
      </FacebookShareButton>
      <TwitterShareButton url={url} title={post.title}>
        <TwitterIcon round size={iconSize} />
      </TwitterShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon round size={iconSize} />
      </WhatsappShareButton>
      <EmailShareButton url={url}>
        <EmailIcon round size={iconSize} />
      </EmailShareButton>
    </div>
  );
}