import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import copyright from '@/components/copyright/copyright.vue'

describe('copyright.vue', () => {
  it('renders with year', () => {
    const msg = '© ' + new Date().getFullYear()
    const wrapper = shallowMount(copyright)
    expect(wrapper.text()).to.include(msg)
  })
})
