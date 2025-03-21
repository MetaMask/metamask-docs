import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import TagsListInline from "@theme/TagsListInline";

function TagsRow(props) {
  return (
    <div
      className={clsx(
        ThemeClassNames.docs.docFooterTagsRow,
        "row margin-bottom--sm"
      )}
    >
      <div className="col">
        <TagsListInline {...props} />
      </div>
    </div>
  );
}

export default function DocItemTags() {
  const { metadata } = useDoc();
  const { tags } = metadata;
  const canDisplayTagsRow = tags.length > 0;
  return (
    <footer
      className={ThemeClassNames.docs.docFooter}
    >
      {canDisplayTagsRow && <TagsRow tags={tags} />}
    </footer>
  );
}
