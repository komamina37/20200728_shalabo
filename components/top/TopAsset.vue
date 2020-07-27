<template>
  <div id="top-asset">
    <div id="asset-inner">
      <!-- Generator: Adobe Illustrator 24.0.1, SVG Export Plug-In  -->

      <svg
        class="liquid _01"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 100 74"
      >
        <path
          class="st01"
          d="M52.8,73.7c26.6,3.3,55.4-19.9,45-45.5c-8.9-21.9-29.6-11-41.3-14.5c-14-4.2-18.4-15.1-32-13.5
	C3.2,2.7-2.4,22.1,0.9,35.5C5.7,55.1,23.5,72.3,52.8,73.7z"
        />
      </svg>
      <svg
        class="liquid _02"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 100 74"
      >
        <path
          class="st01"
          d="M99.2,16.4C96.3,4.6,87.6-5.2,52.2,3.1C39.4,6.2,9-8.5,1.3,9.8C-2.9,19.9,3,27.9,18.3,37.3
	c17.3,10.6,11.9,22.8,32.9,25.9c21.1,3.1,24.5-7.5,31.6-17.4C92,32.9,103.1,32.5,99.2,16.4z"
        />
      </svg>
      <svg
        class="liquid _03"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 100 70.5"
      >
        <path
          class="st01"
          d="M0.2,47c1.7-15,13-13.3,23.7-21.9c16.5-13.3,9.7-11,21.9-21.6c9.2-7.9,25-1.3,33.4,7.4
	C90,22.1,99.5,20.3,100,37.6c0.3,10.6-5.4,11.9-12.3,17.6c-9.6,8-12.3,15.5-24.9,15.3c-15.8-0.3-16-5.4-30.5-5.3
	C3.2,65.3-1.1,58.6,0.2,47z"
        />
      </svg>
      <svg
        class="liquid _04"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 91.3 75"
      >
        <path
          class="st01"
          d="M91.2,55.6C89.8,78.3,61,75.5,39,74.1C20.4,72.9-5.7,59.2,1.1,35.4c2.8-10,0.8-10.9,3.8-19
	C7.2,9.8,10.4,3.4,24.5,0.5c14.3-3,27.9,8.5,31.4,19.2c1.5,4.8,5.8,11.9,15.3,14.9C86.2,39.3,92.2,39.6,91.2,55.6z"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
#top-asset {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  // max-width: 1080px;
  width: 100%;
  height: 100%;
  #asset-inner {
    position: relative;
    max-width: 1080px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    svg {
      position: absolute;
      transform: translate(-50%, -50%);
      width: 100%;
      &.liquid {
        fill: #fff9c0;
        fill: var(--color_sub03);
        // fill: var(--color_font01);
        &._01 {
          // transform: rotate(140deg) translate(-50%, -50%);
          top: 4%;
          left: 4%;
          max-width: 600px;
          max-width: 30vw;
          @include iPad {
            top: 9%;
            left: 13%;
            max-width: 60vw;
          }
          @include sp {
          }
        }
        &._02 {
          top: 34%;
          left: 120%;
          max-width: 560px;
          max-width: 33vw;
          @include iPad {
            top: 28%;
            left: 92%;
            max-width: 72vw;
          }
          @include sp {
          }
        }
        &._03 {
          top: 96%;
          left: 100%;
          max-width: 36vw;
          @include iPad {
            top: 76%;
            left: 96%;
            max-width: 72vw;
          }
          @include sp {
          }
        }
        &._04 {
          top: 92%;
          left: 6%;
          max-width: 32vw;
          @include iPad {
            top: 92%;
            left: 28%;
            max-width: 64vw;
          }
          @include sp {
          }
        }
        .st01 {
          width: 100%;
          @include sp {
          }
        }
      }
    }
  }
}
</style>
