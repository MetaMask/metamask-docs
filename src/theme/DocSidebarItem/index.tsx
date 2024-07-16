import React from "react";
import DocSidebarItem from "@theme-original/DocSidebarItem";
import type DocSidebarItemType from "@theme/DocSidebarItem";
import type { WrapperProps } from "@docusaurus/types";
import clsx from "clsx";

import styles from "./index.module.css";

type Props = WrapperProps<typeof DocSidebarItemType>;

export default function DocSidebarItemWrapper(props: Props): JSX.Element {
  if (props.item.type === "category" || props.item.type === "link") {
    const { className, ...itemProps } = props.item;

    return (
      <>
        <DocSidebarItem
          {...props}
          item={{
            ...itemProps,
            className: clsx(
              className,
              {
                [styles.flaskOnly]: itemProps.customProps?.flask_only,
              },
            ),
          }}
        />
      </>
    );
  }
  return (
    <>
      <DocSidebarItem {...props} />
    </>
  );
}
