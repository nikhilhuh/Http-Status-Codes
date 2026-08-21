import { useEffect } from 'react';
import { siteConfig } from '../utils/seoConfig';

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  ogImage?: string;
}

export function useSEO({
  title,
  description = siteConfig.description,
  canonical,
  noindex = false,
  ogImage = siteConfig.ogImage,
}: SEOProps = {}) {
  useEffect(() => {
    // 1. Title
    const fullTitle = title ? `${title} — ${siteConfig.name}` : siteConfig.name;
    document.title = fullTitle;

    // Helper to update meta tags
    const updateMetaTag = (nameOrProperty: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attribute}="${nameOrProperty}"]`);
      
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, nameOrProperty);
        document.head.appendChild(tag);
      }
      
      tag.setAttribute('content', content);
    };

    // Helper to update link tags (like canonical)
    const updateLinkTag = (rel: string, href: string) => {
      let tag = document.querySelector(`link[rel="${rel}"]`);
      if (href) {
        if (!tag) {
          tag = document.createElement('link');
          tag.setAttribute('rel', rel);
          document.head.appendChild(tag);
        }
        tag.setAttribute('href', href);
      } else if (tag) {
        tag.remove();
      }
    };

    // 2. Meta Description
    updateMetaTag('description', description);

    // 3. Open Graph Tags
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:site_name', siteConfig.name, true);
    
    // Only set og:url and canonical if canonical is provided
    const canonicalUrl = canonical ? `${siteConfig.url}${canonical}` : siteConfig.url;
    updateMetaTag('og:url', canonicalUrl, true);
    updateLinkTag('canonical', canonicalUrl);
    
    if (ogImage) {
      const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteConfig.url}${ogImage}`;
      updateMetaTag('og:image', fullOgImage, true);
    }

    // 4. Twitter Tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    if (ogImage) {
      const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteConfig.url}${ogImage}`;
      updateMetaTag('twitter:image', fullOgImage);
    }

    // 5. Robots
    if (noindex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow');
    }

    // Cleanup isn't strictly necessary for an SPA since the next page will overwrite,
    // but if we navigate to a page WITHOUT useSEO, it would retain old tags.
    // However, our plan puts useSEO on EVERY page, so overwriting is safe.
    // Removing the robots tag on unmount just in case.
    return () => {
       // Optional: revert to some defaults if needed, but in our case every page mounts useSEO.
    };
  }, [title, description, canonical, noindex, ogImage]);
}
