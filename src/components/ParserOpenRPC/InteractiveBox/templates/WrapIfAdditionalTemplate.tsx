// export const WrapIfAdditionalTemplate = (props) => {
//   console.log('props', props);
//   return null
// }

import {
  ADDITIONAL_PROPERTY_FLAG,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
  WrapIfAdditionalTemplateProps,
} from '@rjsf/utils';

/** The `WrapIfAdditional` component is used by the `FieldTemplate` to rename, or remove properties that are
 * part of an `additionalProperties` part of a schema.
 *
 * @param props - The `WrapIfAdditionalProps` for this component
 */
export function WrapIfAdditionalTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
  >(props: WrapIfAdditionalTemplateProps<T, S, F>) {
  console.log('props', props);
  const {
    id,
    classNames,
    style,
    disabled,
    label,
    onKeyChange,
    onDropPropertyClick,
    readonly,
    required,
    schema,
    children,
    uiSchema,
    registry,
  } = props;
  const { templates, translateString } = registry;
  // Button templates are not overridden in the uiSchema
  const { RemoveButton } = templates.ButtonTemplates;
  const keyLabel = translateString(TranslatableString.KeyLabel, [label]);
  const additional = ADDITIONAL_PROPERTY_FLAG in schema;

  if (!additional) {
    return (
      <div className={classNames} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div className={classNames} style={style}>
      <div className='row'>
        <div className='col-xs-5 form-additional'>
          <div className='form-group'>
            <label required={required} id={`${id}-key`}>{keyLabel}</label>
            <input
              className='form-control'
              type='text'
              id={`${id}-key`}
              onBlur={({ target }) => onKeyChange(target && target.value)}
              defaultValue={label}
            />
          </div>
        </div>
        <div className='form-additional form-group col-xs-5'>{children}</div>
        <div className='col-xs-2'>
          <RemoveButton
            className='array-item-remove btn-block'
            style={{ border: '0' }}
            disabled={disabled || readonly}
            onClick={onDropPropertyClick(label)}
            uiSchema={uiSchema}
            registry={registry}
          />
        </div>
      </div>
    </div>
  );
}
