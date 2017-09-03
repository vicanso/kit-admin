import globals from '@/helpers/globals';

export default function setLang(req) {
  const lang = globals.get('CONFIG.lang');
  req.query({
    lang,
  });
}
