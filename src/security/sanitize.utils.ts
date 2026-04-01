/**
 * @file sanitize.utils.ts
 * @description DOMPurify wrapper for sanitising backend or CMS HTML before rendering.
 *   Always call sanitizeHTML before using dangerouslySetInnerHTML.
 * @module src/security/sanitize
 */
import DOMPurify from 'dompurify';

const ALLOWED_TAGS = ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'br', 'span'];
const ALLOWED_ATTR = ['href', 'target', 'rel', 'class'];

export const sanitizeHTML = (dirty: string): string =>
  DOMPurify.sanitize(dirty, {
    ALLOWED_ATTR,
    ALLOWED_TAGS,
  });
