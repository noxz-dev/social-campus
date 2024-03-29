//Original by https://github.com/mirari/v-viewer license MIT, fixed and updated for vue3

import { debounce } from 'throttle-debounce';
import Viewer from 'viewerjs';
import { App, nextTick, VNode, watch } from 'vue';

const install = (app: App, { name = 'viewer', debug = false }) => {
  function createViewer(el: any, options: Viewer.Options, rebuild = false) {
    nextTick(() => {
      if (rebuild || !el[`$${name}`]) {
        destroyViewer(el);
        el[`$${name}`] = new Viewer(el, options);
        log('viewer created');
      } else {
        el[`$${name}`].update();
        log('viewer updated');
      }
    });
  }

  function createObserver(
    el: any,
    options: Viewer.Options,
    debouncedCreateViewer: (el: any, options: Viewer.Options, rebuild: boolean) => void,
    rebuild: boolean
  ) {
    destroyObserver(el);
    const MutationObserver = window.MutationObserver;
    if (!MutationObserver) {
      log('observer not supported');
      return;
    }
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        log('viewer mutation:' + mutation.type);
        debouncedCreateViewer(el, options, rebuild);
      });
    });
    const config = { attributes: true, childList: true, characterData: true, subtree: true };
    observer.observe(el, config);
    el['$viewerMutationObserver'] = observer;
    log('observer created');
  }

  function createWatcher(
    el: any,
    { expression }: any,
    vnode: VNode,
    debouncedCreateViewer: (el: any, options: Viewer.Options, rebuild: boolean) => void
  ) {
    const simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;
    if (!expression || !simplePathRE.test(expression)) {
      log('only simple dot-delimited paths can create watcher');
      return;
    }
    el['$viewerUnwatch'] = watch(
      expression,
      function (newVal?: any, oldVal?: any) {
        log('change detected by watcher: ', expression);
        debouncedCreateViewer(el, newVal, true);
      },
      {
        deep: true,
      }
    );
    log('watcher created, expression: ', expression);
  }

  function destroyViewer(el: any) {
    if (!el[`$${name}`]) {
      return;
    }
    el[`$${name}`].destroy();
    delete el[`$${name}`];
    log('viewer destroyed');
  }

  function destroyObserver(el: any) {
    if (!el['$viewerMutationObserver']) {
      return;
    }
    el['$viewerMutationObserver'].disconnect();
    delete el['$viewerMutationObserver'];
    log('observer destroyed');
  }

  function destroyWatcher(el: any) {
    if (!el['$viewerUnwatch']) {
      return;
    }
    el['$viewerUnwatch']();
    delete el['$viewerUnwatch'];
    log('watcher destroyed');
  }

  function log(...args: any[]) {
    debug && console.log(...args);
  }

  app.directive('viewer', {
    beforeMount(el, binding, vnode) {
      log('viewer bind');
      const debouncedCreateViewer = debounce(50, createViewer);
      debouncedCreateViewer(el, binding.value);

      createWatcher(el, binding, vnode, debouncedCreateViewer);

      if (!binding.modifiers.static) {
        createObserver(el, binding.value, debouncedCreateViewer, binding.modifiers.rebuild);
      }
    },
    beforeUnmount(el) {
      log('viewer unbind');
      destroyObserver(el);
      destroyWatcher(el);
      destroyViewer(el);
    },
  });
};

export default {
  install,
};
