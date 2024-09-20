import React, { type ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import {
  useDocById,
  findFirstSidebarItemLink,
} from "@docusaurus/plugin-content-docs/client";
import isInternalUrl from "@docusaurus/isInternalUrl";
import { translate } from "@docusaurus/Translate";
import Heading from "@theme/Heading";
import type { Props } from "@theme/DocCard";

import cardListItemStyles from "@site/src/components/CardList/CardListItem/styles.module.css";

import styles from "./styles.module.css";

import type {
  PropSidebarItemCategory,
  PropSidebarItemLink,
} from "@docusaurus/plugin-content-docs";

function CardContainer({
  href,
  children,
  flaskOnly,
}: {
  href: string;
  children: ReactNode;
  flaskOnly?: boolean;
}): JSX.Element {
  return (
    <Link
      href={href}
      className={clsx("card padding--lg", styles.cardContainer, {
        [cardListItemStyles.flaskOnly]: flaskOnly,
      })}
    >
      {/* @ts-ignore */}
      {children}
    </Link>
  );
}

function CardLayout({
  href,
  icon,
  title,
  description,
  flaskOnly,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  description?: string;
  flaskOnly?: boolean;
}): JSX.Element {
  return (
    <CardContainer flaskOnly={flaskOnly} href={href}>
      <Heading
        as="h2"
        className={clsx("text--truncate", styles.cardTitle)}
        title={title}
      >
        {icon} {title}
      </Heading>
      {description && (
        <p
          className={clsx("text--truncate", styles.cardDescription)}
          title={description}
        >
          {description}
        </p>
      )}
    </CardContainer>
  );
}

function CardCategory({
  item,
}: {
  item: PropSidebarItemCategory;
}): JSX.Element | null {
  const href = findFirstSidebarItemLink(item);

  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null;
  }

  return (
    <CardLayout
      flaskOnly={!!item.customProps?.flask_only}
      href={href}
      icon="🗃️"
      title={item.label}
      description={
        item.description ??
        translate(
          {
            message: "{count} items",
            id: "theme.docs.DocCard.categoryDescription",
            description:
              "The default description for a category card in the generated index about how many items this category includes",
          },
          { count: item.items.length },
        )
      }
    />
  );
}

function CardLink({ item }: { item: PropSidebarItemLink }): JSX.Element {
  const icon = isInternalUrl(item.href) ? "📄️" : "🔗";
  const doc = useDocById(item.docId ?? undefined);
  return (
    <CardLayout
      flaskOnly={!!item.customProps?.flask_only}
      href={item.href}
      icon={icon}
      title={item.label}
      description={item.description ?? doc?.description}
    />
  );
}

export default function DocCard({ item }: Props): JSX.Element {
  switch (item.type) {
    case "link":
      return <CardLink item={item} />;
    case "category":
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
