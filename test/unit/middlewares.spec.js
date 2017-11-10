'use strict'

/**
 * adonis-acl
 * Copyright(c) 2017 Evgeny Razumov
 * MIT Licensed
 */

const test = require('japa')
const Is = require('../../src/Middlewares/Is')
const Can = require('../../src/Middlewares/Can')

test.group('Can Middleware', function () {
  test('should allow', async (assert) => {
    const fakeRequest = {
      auth: {
        user: {
          can () {
            return true
          }
        }
      }
    }
    const can = new Can()
    await can.handle(fakeRequest, () => {
      return assert.isTrue(true)
    }, 'edit_users && delete_users')
  })

  test('should throw error', async (assert) => {
    try {
      const fakeRequest = {
        auth: {
          user: {
            can () {
              return false
            }
          }
        }
      }
      const can = new Can()
      await can.handle(fakeRequest, () => {}, 'edit_users && delete_users')
    } catch (e) {
      assert.equal(e.name, 'ForbiddenException')
      assert.equal(e.message, 'Access forbidden. You are not allowed to this resource.')
    }
  })
})

test.group('Is Middleware', function () {
  test('should allow', async (assert) => {
    const fakeRequest = {
      auth: {
        user: {
          is () {
            return true
          }
        }
      }
    }
    const is = new Is()
    await is.handle(fakeRequest, () => {
      return assert.isTrue(true)
    }, 'administrator || moderator')
  })

  test('should throw error', async (assert) => {
    try {
      const fakeRequest = {
        auth: {
          user: {
            is () {
              return false
            }
          }
        }
      }
      const is = new Is()
      await is.handle(fakeRequest, () => {}, 'administrator || moderator')
    } catch (e) {
      assert.equal(e.name, 'ForbiddenException')
      assert.equal(e.message, 'Access forbidden. You are not allowed to this resource.')
    }
  })
})
