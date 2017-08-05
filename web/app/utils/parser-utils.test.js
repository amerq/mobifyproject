/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

/* eslint-env jquery, jest */
import * as ParserUtils from './parser-utils'

test('parseTextLink returns the correct href, text, and title', () => {
    expect(ParserUtils.parseTextLink($('<a href="/test.html" title="Test">Click Here!</a>')))
        .toEqual(ParserUtils.TextLink({
            href: '/test.html',
            text: 'Click Here!',
            title: 'Test'
        }))
})

test('parseButton returns the correct values', () => {
    [true, false].forEach((isDisabled) => {
        const buttonHtml = `<button type="submit" name="Submit" value="test"${isDisabled ? ' disabled' : ''}>Button</button>`

        expect(ParserUtils.parseButton($(buttonHtml)))
            .toEqual({
                type: 'submit',
                children: 'Button',
                name: 'Submit',
                value: 'test',
                disabled: isDisabled
            })
    })
})

test('parseImage returns title, alt, and src', () => {
    const imageHtml = '<img src="equality.svg" title="Equality Now!" alt="An equals sign" />'

    expect(ParserUtils.parseImage($(imageHtml)))
        .toEqual({
            src: 'equality.svg',
            title: 'Equality Now!',
            alt: 'An equals sign'
        })

})

test('parseImage prefers x-src to src', () => {
    const imageHtml = '<img src="fail.gif" x-src="pass.gif" />'

    expect(ParserUtils.parseImage($(imageHtml)).src).toBe('pass.gif')
})

test('parseOption gets the right options', () => {
    [true, false].forEach((isSelected) => {
        const optionHtml = `<option value="test"${isSelected ? ' selected' : ''}>Option</option>`

        expect(ParserUtils.parseOption($(optionHtml)))
            .toEqual({
                key: 'test',
                value: 'test',
                selected: isSelected,
                text: 'Option'
            })
    })
})

test('parseSelect parses the select and its options', () => {
    const optionVals = ['Jest', 'AVA', 'Mocha']
    const selectHtml = `<select name="tester">${optionVals.map((val) => `<option value="${val}" />`).join('')}</select>`

    const result = ParserUtils.parseSelect($, $(selectHtml))

    expect(result.name).toBe('tester')

    for (let i = 0; i < optionVals.length; i++) {
        expect(result.options[i].value).toBe(optionVals[i])
    }
})
