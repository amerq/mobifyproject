```js
// JS import
import RegionField from '../components/region-field'

// SCSS import
@import '../components/region-field/base';
```


## Example With Presupplied Values
    const ReduxForm = require('redux-form');
    const Redux = require('redux');
    const ReactRedux = require('react-redux');
    const React = require('react');

    // Redux setup
    const reducers = {
        form: ReduxForm.reducer,
    };
    const reducer = Redux.combineReducers(reducers);
    const store = Redux.createStore(reducer);


    const regions = [
        {value: 'bc', label: 'British Columbia'},
        {value: 'ab', label: 'Alberta'}
    ]

    // The form
    const DemoForm = (props) => {
        const { handleSubmit } = props
        return (
            <div>
                <h3>Order Info</h3>
                <form onSubmit={handleSubmit}>
                    <FieldRow>
                        <RegionField regions={regions} />
                    </FieldRow>
                </form>
            </div>
        );
    }

    let StateDisplay = (props) => {
        return (
            <div>
                <h3>Form data</h3>
                <pre>
                    {JSON.stringify(props.values, null, '  ')}
                </pre>
            </div>
        )
    }

    StateDisplay = ReactRedux.connect((state)=>{return {values: state.form.country.values}})(StateDisplay)

    const DecoratedForm = ReduxForm.reduxForm({
        form: 'country', // a unique name for this form
    })(DemoForm);


    <ReactRedux.Provider store={store}>
        <div style={{display: 'flex', flexDirection: 'column-reverse'}}>
            <div style={{flex: "1 0 auto"}}>
                <DecoratedForm />
            </div>
            <div style={{flex: "1 0 auto"}}>
                <StateDisplay />
            </div>
        </div>
    </ReactRedux.Provider>

## Example With No Presupplied Values
    const ReduxForm = require('redux-form');
    const Redux = require('redux');
    const ReactRedux = require('react-redux');
    const React = require('react');

    // Redux setup
    const reducers = {
        form: ReduxForm.reducer,
    };
    const reducer = Redux.combineReducers(reducers);
    const store = Redux.createStore(reducer);

    // The form
    const DemoForm = (props) => {
        const { handleSubmit } = props
        return (
            <div>
                <h3>Order Info</h3>
                <form onSubmit={handleSubmit}>
                    <FieldRow>
                        <RegionField />
                    </FieldRow>
                </form>
            </div>
        );
    }

    let StateDisplay = (props) => {
        return (
            <div>
                <h3>Form data</h3>
                <pre>
                    {JSON.stringify(props.values, null, '  ')}
                </pre>
            </div>
        )
    }

    StateDisplay = ReactRedux.connect((state)=>{return {values: state.form.country.values}})(StateDisplay)

    const DecoratedForm = ReduxForm.reduxForm({
        form: 'country', // a unique name for this form
    })(DemoForm);


    <ReactRedux.Provider store={store}>
        <div style={{display: 'flex', flexDirection: 'column-reverse'}}>
            <div style={{flex: "1 0 auto"}}>
                <DecoratedForm />
            </div>
            <div style={{flex: "1 0 auto"}}>
                <StateDisplay />
            </div>
        </div>
    </ReactRedux.Provider>
