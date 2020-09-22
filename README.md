# francisleigh/accessible-system
## Usage
```javascript
import A11y from "@a11y-system";

const Box = styled.div.attrs(A11y)`
  height: 100px;
  width: 100px;
`

const BoxMultiAttrs = styled.div.attrs((props) => ({
  ...A11y(props),
  ...OtherAttrLib(props),
  style: { borderBottom: 2 }
}))`
  height: 100px;
  width: 100px;
`
```

```javascript
import Box from "@components/Box";

<Box 
  a11y={boolean}
  a11yLabel={string}
  a11yHint={string}
  a11yRole={string}
  a11yStates={string[]}
  a11yHideChildren={boolean}
  a11yLiveRegion={boolean}
  a11yAssertive={boolean}
  a11yNoInvert={boolean}
  a11yValue={object}
  a11yIsModal={boolean}
  a11yOnEscape={Function}
  a11yOnTap={Function}
  a11yOnMagicTap={Function}
  a11yActions={A11yAction[]}
  a11yOnAction={Function}
  disabled={boolean}
/>
```
