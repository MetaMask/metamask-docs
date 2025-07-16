import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import {
  useActivePlugin,
  useDocVersionSuggestions,
} from "@docusaurus/plugin-content-docs/client";
import { ThemeClassNames } from "@docusaurus/theme-common";
import {
  useDocsPreferredVersion,
  useDocsVersion,
} from "@docusaurus/plugin-content-docs/client";
function UnreleasedVersionLabel({ siteTitle, versionMetadata }) {
  return (
    <Translate
      id="theme.docs.versions.unreleasedVersionLabel"
      description="The label used to tell the user that he's browsing an unreleased doc version"
      values={{
        siteTitle,
        versionLabel: <b>{versionMetadata.label}</b>,
      }}>
      {
        "This is the development version of the documentation and some features may not yet be available in the latest release."
      }
    </Translate>
  );
}
function UnmaintainedVersionLabel({ siteTitle, versionMetadata }) {
  return (
    <Translate
      id="theme.docs.versions.unmaintainedVersionLabel"
      description="The label used to tell the user that he's browsing an unmaintained doc version"
      values={{
        siteTitle,
        versionLabel: <b>{versionMetadata.label}</b>,
      }}>
      {
        "This is documentation for the MetaMask Delegation Toolkit version {versionLabel}, which is no longer actively maintained."
      }
    </Translate>
  );
}
const BannerLabelComponents = {
  unreleased: UnreleasedVersionLabel,
  unmaintained: UnmaintainedVersionLabel,
};
function BannerLabel(props) {
  const BannerLabelComponent =
    BannerLabelComponents[props.versionMetadata.banner];
  return <BannerLabelComponent {...props} />;
}
function LatestVersionSuggestionLabel({ versionLabel, to, onClick }) {
  return (
    <Translate
      id="theme.docs.versions.latestVersionSuggestionLabel"
      description="The label used to tell the user to check the latest version"
      values={{
        versionLabel,
        latestVersionLink: (
          <Link to={to} onClick={onClick}>
            <Translate
              id="theme.docs.versions.latestVersionLinkLabel"
              description="The label used for the latest version suggestion link label">
              latest version
            </Translate>
          </Link>
        ),
      }}>
      {" You can switch to the {latestVersionLink} ({versionLabel})."}
    </Translate>
  );
}
function DocVersionBannerEnabled({ className, versionMetadata }) {
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { pluginId } = useActivePlugin({ failfast: true });
  const getVersionMainDoc = (version) =>
    version.docs.find((doc) => doc.id === version.mainDocId);
  const { savePreferredVersionName } = useDocsPreferredVersion(pluginId);
  const { latestDocSuggestion, latestVersionSuggestion } =
    useDocVersionSuggestions(pluginId);
  // Try to link to same doc in latest version (not always possible), falling
  // back to main doc of latest version
  const latestVersionSuggestedDoc =
    latestDocSuggestion ?? getVersionMainDoc(latestVersionSuggestion);
  return (
    <div
      className={clsx(
        className,
        ThemeClassNames.docs.docVersionBanner,
        "alert alert--warning margin-bottom--lg",
      )}
      role="alert">
      <div>
        <BannerLabel siteTitle={siteTitle} versionMetadata={versionMetadata} />
        <LatestVersionSuggestionLabel
          versionLabel={latestVersionSuggestion.name}
          to={latestVersionSuggestedDoc.path}
          onClick={() => savePreferredVersionName(latestVersionSuggestion.name)}
        />
      </div>
    </div>
  );
}
export default function DocVersionBanner({ className }) {
  const versionMetadata = useDocsVersion();
  if (versionMetadata.banner) {
    return (
      <DocVersionBannerEnabled
        className={className}
        versionMetadata={versionMetadata}
      />
    );
  }
  return null;
}
