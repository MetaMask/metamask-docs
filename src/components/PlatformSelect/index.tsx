import React from "react";
import * as Select from "@radix-ui/react-select";
import { useHistory } from "@docusaurus/router";
import clsx from "clsx";
import { useColorMode } from "@docusaurus/theme-common";
import { FiCheck, FiChevronDown, FiChevronUp } from "react-icons/fi";
import styles from "./styles.module.css";
import JavaScriptIcon from "@site/static/img/platform-icons/javascript.svg";
import iOSIcon from "@site/static/img/platform-icons/ios.svg";
import AndroidIcon from "@site/static/img/platform-icons/android.svg";
import UnityIcon from "@site/static/img/platform-icons/unity.svg";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import { useWindowSize } from "@docusaurus/theme-common";
import usePageState from "../../hooks/usePageState";

const platforms = {
  "sdk": [
    {
      value: "javascript",
      label: "JavaScript",
      icon: JavaScriptIcon,
      iconDark: JavaScriptIcon,
    },
    {
      value: "ios",
      label: "iOS",
      icon: iOSIcon,
      iconDark: iOSIcon,
    },
    {
      value: "android",
      label: "Android",
      icon: AndroidIcon,
      iconDark: AndroidIcon,
    },
    {
      value: "unity",
      label: "Unity",
      icon: UnityIcon,
      iconDark: UnityIcon,
    },
  ],
};

const PlatformSelect = () => {
  const { colorMode } = useColorMode();
  const { push } = useHistory();
  const pageState = usePageState();
  const windowSize = useWindowSize();
  const mobileSidebar = useNavbarMobileSidebar();

  const handlePlatformChange = (selectedPlatform) => {
    push(`/${pageState?.path}/${selectedPlatform}`);

    if (windowSize === "mobile" && mobileSidebar.shown) {
      mobileSidebar.toggle();
    }
  };

  // Workaround for issue: https://github.com/radix-ui/primitives/issues/1658
  const handleOnOpenChange = (open) => {
    const items = document.querySelectorAll(
      ".menu__link, .navbar-sidebar__back, .navbar__brand"
    );

    items.forEach((item) => {
      if (open) {
        item.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
        });
      } else {
        item.removeEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
        });
      }
    });
  };

  return pageState && platforms?.[pageState?.path] ? (
    <>
      <div className={styles.platformSelect}>
        <div className={styles.platformSelect__inner}>
          <Select.Root
            defaultValue={pageState?.platform}
            onValueChange={handlePlatformChange}
            onOpenChange={handleOnOpenChange}
          >
            <Select.Trigger
              aria-label="Select platform"
              className={clsx("sections-menu-trigger")}
            >
              <Select.Value />
              <Select.Icon>
                <FiChevronDown className="sections-menu-scrollButton" />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content className={clsx("sections-menu-content")}>
                <Select.ScrollUpButton className="sections-menu-scrollButton">
                  <FiChevronUp />
                </Select.ScrollUpButton>

                <Select.Viewport>
                  <Select.Group>
                    {platforms?.[pageState?.path as string]?.map(
                      ({ value, label, icon: Icon, iconDark: IconDark }) => (
                        <Select.Item
                          key={value}
                          value={value}
                          className={clsx("sections-menu-item")}
                        >
                          <Select.ItemText>
                            <div className="item-text">
                              {colorMode === "dark"
                                ? IconDark && <IconDark />
                                : Icon && <Icon />}
                              <span>{label}</span>
                            </div>
                          </Select.ItemText>
                          <Select.ItemIndicator className="flex items-center">
                            <FiCheck className="item-indicator" />
                          </Select.ItemIndicator>
                        </Select.Item>
                      )
                    )}
                  </Select.Group>
                </Select.Viewport>

                <Select.ScrollDownButton className="sections-menu-scrollButton">
                  <FiChevronDown />
                </Select.ScrollDownButton>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default PlatformSelect;