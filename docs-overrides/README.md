# Customizing The Mkdocs Material Theme

## Adding Custom Template 

1. Update `mkdocs.yml` to specify `custom_dir: docs-overrides` in theme
1. Add custom templates into the docs-overrides folder e.g., `docs-overrides/home.html`
1. In front-matter of relevant markdown pages, specify template to use.

For example, `index.md` for root can now have:

```md
---
title: Title
template: home.html
---
```

**Tip:** To remove the default "Title" of page from showing up just set a `#` anchor in your index.md with no string.


---

## References

```
# .........................Mkdocs Usage Documentation ......
# Customization
# https://squidfunk.github.io/mkdocs-material/setup/changing-the-colors/?h=color#customization
# Overrides
# https://squidfunk.github.io/mkdocs-material/customization/#extending-the-theme
# Social
# https://squidfunk.github.io/mkdocs-material/setup/setting-up-social-cards/?h=social
# Tags
# https://squidfunk.github.io/mkdocs-material/setup/setting-up-tags/?h=tags#adding-a-tags-index
# ..........................................................
```