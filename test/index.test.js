import test from 'ava'
import { Nuxt, Builder } from 'nuxt'
import { resolve } from 'path'
import { shallowMount } from '@vue/test-utils'
import Index from './../pages/index.vue'

// PURPOSE OF E2E TESTING: exercise a complete production-like scenario.

// We keep a reference to Nuxt so we can close
// the server at the end of the test
let nuxt = null
// Reference of our window being tested
let window = null

// Init Nuxt.js and start listening on localhost:3000
test.before('Init Nuxt.js', async t => {
  const rootDir = resolve(__dirname, '..')
  let config = {}
  try { config = require(resolve(rootDir, 'nuxt.config.js')) } catch (e) {}
  config.rootDir = rootDir // project folder
  config.dev = false // production build
  config.mode = 'universal' // Isomorphic application
  nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  nuxt.listen(3001, 'localhost')
  window = await nuxt.renderAndGetWindow('http://localhost:3001/') // Get a reference of the window at /
})

// Close the nuxt instance once we finish our testing
test.after('Close Nuxt.js', async t => {
    nuxt.close()
})

// TODO: Mock component to test methods
/* test.beforeEach(() => {
    const wrapper = shallowMount(Index)
})
 */

// API data testing
test('Verify that the list of agencies exists and is not empty', async t => {
    const agencyList = window.document.getElementsByClassName('agency')
    for (var i = 0; i < agencyList.length; i++) {
        t.not(agencyList[i], null)
    }
})

test('Verify that the list has the right number of agencies (8)', async t => {
    const agencyList = window.document.getElementsByClassName('agency')
    t.is(agencyList.length, 8)
})

test('Verify that the winner agency card is populated with data', async t => {
    const winnerAgency = window.document.querySelector('.winnerAgency-data')
    t.not(winnerAgency, null)
})

// HTML values testing
test('Verify that the title of the page is correct', async t => {
    const pageTitle = window.document.getElementsByTagName('H1')[0]
    t.is(pageTitle.textContent, "It’s a beautiful Zenday !")
})

test('Verify that the subtitle of the page is correct', async t => {
    const pageSubtitle = window.document.getElementsByTagName('P')[0]
    t.is(pageSubtitle.textContent.trim(), "Pour connaître la meilleure météo  aujourd’hui parmi les agences Zenika.")
})

// Network testing
test('Verify that we are on the correct URL path', async t => {
    const currentPath = window.location.pathname
    t.is(currentPath, '/')
})