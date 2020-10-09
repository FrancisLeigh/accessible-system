interface A11yAction {
  name: string;
  label: string;
}
interface A11yReturned {
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole: string|'none';
  accessibilityStates?: (string|false)[];
  accessibilityElementsHidden?: boolean;
  importantForAccessibility: string;
  accessibilityLiveRegion: string;
  accessibilityIgnoresInvertColors?: boolean;
  accessibilityValue?: object;
  accessibilityViewIsModal?: boolean;
  onAccessibilityEscape?: Function;
  onAccessibilityTap?: Function;
  onMagicTap?: Function;
  accessibilityActions?: A11yAction[];
  onAccessibilityAction?: Function;
}
interface A11yAttrsProps {
    /**
     * Defaults to true
     * https://reactnative.dev/docs/accessibility#accessible
      */
    a11y?: boolean;
    /**
     * Text that is read by the screen reader when focused
     * https://reactnative.dev/docs/accessibility#accessibilitylabel
     */
    a11yLabel?: string;
    /**
     * Text that is read by the screen reader when focused (after @a11yLabel)
     * https://reactnative.dev/docs/accessibility#accessibilityhint
     */
    a11yHint?: string;
    /**
     * Communicates the purpose of the component
     * https://reactnative.dev/docs/accessibility#accessibilityrole
     */
    a11yRole?: string;
    /**
     * Describes the current state of the component
     * https://reactnative.dev/docs/accessibility#accessibilitystate
     */
    a11yStates: (string | false)[];
    /**
     * Value indicating whether the children of the component are hidden to the screen reader
     * https://reactnative.dev/docs/accessibility#accessibilityelementshidden
     * https://reactnative.dev/docs/accessibility#importantforaccessibility
     */
    a11yHideChildren?: boolean;
    /**
     * Wether or not to announce when a value changes within the component
     * Android: https://reactnative.dev/docs/accessibility#accessibilityliveregion
     */
    a11yLiveRegion?: boolean;
    /**
     * If true, the screen reader will interupt any current announcements in order to update the user
     * of any value changes to the component.
     * Works in conjunction with @a11yLiveRegion
     * https://reactnative.dev/docs/accessibility#accessibilityliveregion
     */
    a11yAssertive?: boolean;
    /**
     * IOS
     * If true, the component will not be affected by any device-level color inversion
     * https://reactnative.dev/docs/accessibility#accessibilityignoresinvertcolors
     */
    a11yNoInvert?: boolean;
    /**
     * Represents the current value of a component
     * https://reactnative.dev/docs/accessibility#accessibilityvalue
     */
    a11yValue?: object;
    /**
     * IOS
     * When component is overlaying the page, the screen reader should ignore the page behind
     * https://reactnative.dev/docs/accessibility#accessibilityviewismodal
     */
    a11yIsModal?: boolean;
    /**
     * IOS
     * Callback function that is fired when the user performs the "Escape" gesture (Z shape gesture)
     * https://reactnative.dev/docs/accessibility#onaccessibilityescape
     */
    a11yOnEscape?: Function;
    /**
     * IOS
     * Callback function that is fired when the user performs the "Tap" gesture (Double tap)
     * https://reactnative.dev/docs/accessibility#onaccessibilityescape
     */
    a11yOnTap?: Function;
    /**
     * IOS
     * Callback function that is fired when the user performs the "Magic tap" gesture (double tap with two fingers)
     * https://reactnative.dev/docs/accessibility#onmagictap
     */
    a11yOnMagicTap?: Function;
    /**
     * List of actions to be used and handled by @a11yOnAction
     * https://reactnative.dev/docs/accessibility#accessibility-actions
     */
    a11yActions?: A11yAction[];
    /**
     * Function that handles any actions defined in @a11yActions.
     * https://reactnative.dev/docs/accessibility#accessibility-actions
     */
    a11yOnAction?: Function;
    /**
     * If true, will add the 'disabled' state to the list of @a11yStates.
     * This is also added to allow usage with the <Pressable /> Component.
     */
    disabled?: boolean;
    /**
     * The same as @disabled but handled to allow usage with Touchable components.
     * If false, will add the 'disabled' state to the list of @a11yStates
     */
    enabled?: boolean;
    /**
     * If true, will add the 'busy' state to the list of @a11yStates.
     */
    busy?: boolean;

    [x: string]: any;
};

const A11yDefaultProps = {
  a11y: true,
  a11yLabel: null,
  a11yHint: '',
  a11yRole: '',
  a11yStates: [],
  a11yHideChildren: false,
  a11yLiveRegion: false,
  a11yAssertive: void 0,
  a11yNoInvert: false,
  a11yValue: {},
  a11yIsModal: false,
  a11yOnEscape: () => {},
  a11yOnTap: () => {},
  a11yOnMagicTap: () => {},
  a11yActions: [],
  a11yOnAction: () => {},
  disabled: false,
  enabled: true,
  busy: false,
}

export default function A11y(_props : A11yAttrsProps) {
  const props = { ...A11yDefaultProps, ..._props };
  const states = [
    (props.disabled || props.enabled === false) && 'disabled',
    props.busy && 'busy',
  ]
    .concat(props.a11yStates)
    .filter(Boolean);
  const android_hide_descendants = props.a11yHideChildren ? 'no-hide-descendants' : 'yes';
  const android_live_region = () => {
    if (typeof props.a11yAssertive === 'string') return 'assertive';
    else if (!!props.a11yLiveRegion) return 'polite';
    else return 'none';
  };

  const shakenObj: A11yReturned = {
    accessibilityRole: props.a11yRole || 'none',
    accessibilityLiveRegion: android_live_region(),
    importantForAccessibility: android_hide_descendants,
  };
  if (props.a11y) shakenObj.accessible = props.a11y;
  if (props.a11yLabel) shakenObj.accessibilityLabel = props.a11yLabel;
  if (props.a11yHint) shakenObj.accessibilityHint = props.a11yHint;
  if (states.length) shakenObj.accessibilityStates = states;
  if (props.a11yHideChildren) shakenObj.accessibilityElementsHidden = props.a11yHideChildren;
  if (props.a11yNoInvert) shakenObj.accessibilityIgnoresInvertColors = props.a11yNoInvert;
  if (props.a11yValue) shakenObj.accessibilityValue = props.a11yValue;
  if (props.a11yIsModal) shakenObj.accessibilityViewIsModal = props.a11yIsModal;
  if (props.a11yOnEscape) shakenObj.onAccessibilityEscape = props.a11yOnEscape;
  if (props.a11yOnTap) shakenObj.onAccessibilityTap = props.a11yOnTap;
  if (props.a11yOnMagicTap) shakenObj.onMagicTap = props.a11yOnMagicTap;
  if (props.a11yActions) shakenObj.accessibilityActions = props.a11yActions;
  if (props.a11yOnAction) shakenObj.onAccessibilityAction = props.a11yOnAction;

  return shakenObj;
}
