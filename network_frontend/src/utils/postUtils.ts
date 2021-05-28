import DOMPurify from 'dompurify';
import marked from 'marked';

export const parseMarkdown = (value: string) => {
  const content = parseTags(value);
  return {
    sanitizedContent: DOMPurify.sanitize(marked(content.parsedContent), {
      ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|tel|callto|cid|xmpp|xxx):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    }),
    ...content,
  };
};

function extractEmails(text: string) {
  return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
}

interface ParseTagsResult {
  parsedContent: string;
  tagIds: string[];
  mentions: string[];
}

export const parseTags = (content: string): ParseTagsResult => {
  const tagIds: string[] = [];
  const mentions: string[] = [];
  const foundEmails = extractEmails(content);

  if (foundEmails) {
    for (const [index, email] of foundEmails.entries()) {
      content = content.replaceAll(email, `[${index}]`);
    }
  }
  let parsedContent = content
    .replaceAll(/#[a-zA-ZäöüÄÖÜß][a-zA-ZäöüÄÖÜß0-9]*/g, (val) => {
      val = val.replaceAll('#', '');
      if (val.length === 0) return val;
      const tag = `<span id="${val}" class="cursor-pointer inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">#${val}</span>`;
      tagIds.push(val);
      return tag;
    })
    .replaceAll(/@[a-zA-ZäöüÄÖÜß][a-zA-ZäöüÄÖÜß0-9]*/g, (val: string) => {
      val = val.replaceAll('@', '');
      if (val.length === 0) return val;
      const mention = `<span id="${val}" class="cursor-pointer inline-flex items-center py-0.5 rounded-full text-md hover:underline font-medium text-highlight-500">@${val}</span>`;
      mentions.push(val);
      return mention;
    });
  if (foundEmails) {
    for (const [index, email] of foundEmails.entries()) {
      parsedContent = parsedContent.replaceAll(`[${index}]`, email);
    }
  }
  return { parsedContent, tagIds, mentions };
};
