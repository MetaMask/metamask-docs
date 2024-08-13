import { useContext, useEffect } from "react";
import { ADDITIONAL_PROPERTY_FLAG } from '@rjsf/utils';
import { BaseInputTemplate } from "@site/src/components/ParserOpenRPC/InteractiveBox/templates/BaseInputTemplate";
import { ParserOpenRPCContext } from "@site/src/components/ParserOpenRPC";

export const WrapIfAdditionalTemplate = (props) => {
  const {
    id,
    classNames,
    style,
    disabled,
    label,
    onKeyChange,
    onDropPropertyClick,
    readonly,
    schema,
    children,
    registry,
    formContext
  } = props;
  const { templates } = registry;
  const { RemoveButton } = templates.ButtonTemplates;
  const additional = ADDITIONAL_PROPERTY_FLAG in schema;
  const { drawerLabel, isComplexTypeView, setDrawerLabel } = useContext(ParserOpenRPCContext);
  const { setCurrentSchemaId } = formContext;

  if (!additional) {
    return (
      <div className={classNames} style={style}>
        {children}
      </div>
    );
  }

  useEffect(() => {
    if (!id.includes("_newKey")) {
      setCurrentSchemaId(id);
    }
  }, [])

  return (
    isComplexTypeView ? <div className={classNames} style={style}>
      {drawerLabel === label && (
        <div>
          <RemoveButton
            disabled={disabled || readonly}
            onClick={onDropPropertyClick(label)}
            registry={registry}
          />
          <BaseInputTemplate
            name='key'
            onChange={(target) => {
              onKeyChange(target);
              setDrawerLabel(target);
            }}
            schema={{...schema, ...{ type: "string" }}}
            formContext={formContext}
            value={label}
          />
        </div>
      )}
      <div>{children}</div>
    </div> : null
  );
}
