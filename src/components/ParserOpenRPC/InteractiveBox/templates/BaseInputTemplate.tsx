import React, { useCallback, useEffect, useState } from "react";
import { BaseInputTemplateProps } from "@rjsf/utils";
import clsx from "clsx";
import styles from "@site/src/components/ParserOpenRPC/InteractiveBox/styles.module.css";
import { Tooltip } from "@site/src/components/ParserOpenRPC/Tooltip";
import debounce from "lodash.debounce";

export const BaseInputTemplate = ({
    schema,
    id,
    name,
    value = "",
    disabled,
    onChange,
    rawErrors,
    hideError,
    required,
    formContext,
  }: BaseInputTemplateProps) => {
  const isNumber = schema.type === "number" || schema.type === "integer";
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(isNumber ? 0 : "");

  const { isFormReseted } = formContext;
  const hasErrors = rawErrors?.length > 0 && !hideError;
  const debouncedOnChange = useCallback(debounce((e, isInputNumber = false) => {
    onChange(isInputNumber ? e : e?.target?.value);
  }, 300), []);
  const onInputChange = (e) => {
    setInputValue(e?.target?.value);
    debouncedOnChange(e);
  };
  const onInputNumberChange = (value) => {
    setInputValue(value);
    debouncedOnChange(value, true);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value, isFormReseted]);

  useEffect(() => {
    setInputValue(value);
  }, []);

  return (
    <div className={styles.tableRow}>
      <div className={styles.tableColumn}>
        <label className={clsx(styles.tableColumnParam, isFocused && styles.tableColumnParamFocused)}>
          {name}{required ? "*" : ""}
        </label>
      </div>
      <div className={styles.tableColumn}>
        <Tooltip message={hasErrors ? rawErrors[0] : ""} disabled={!rawErrors}>
          <div className={styles.tableValueRow}>
            <input
              id={id}
              value={inputValue}
              disabled={disabled}
              className={clsx(styles.formControl, hasErrors && styles.formControlError)}
              type={isNumber ? "number" : schema.type as string}
              pattern={schema.pattern}
              onChange={onInputChange}
              onFocus={() => { setIsFocused(true); }}
              onBlur={() => { setIsFocused(false); }}
            />
            <span className={styles.tableColumnType}>
              {schema.type}
              {hasErrors && !isNumber ? <span className={clsx(styles.tableColumnIcon, styles.tableColumnIconError)} /> : null}
              {isNumber ? (
                <>
                  <span
                    className={clsx(styles.tableColumnIcon, styles.chevronIcon, styles.formControlNumberUp)}
                    onClick={() => { onInputNumberChange(Number((+inputValue || 0) + 1)); }}
                  />
                  <span
                    className={clsx(styles.tableColumnIcon, styles.chevronIcon, styles.chevronIconDown, styles.formControlNumberDown)}
                    onClick={() => { inputValue >= 1 && onInputNumberChange(Number((+inputValue || 0) - 1)); }}
                  />
                </>
              ) : null}
            </span>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};
