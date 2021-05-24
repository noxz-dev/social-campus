<template>
  <card class="flex flex-col justify-center" bgColorDark="bg-dark-500">
    <div class="p-1 pb-2 pt-2">
      <div class="p-2 h-64">
        <lazy-image
          class="rounded-xl object-cover w-full"
          src="https://picsum.photos/300/300"
          :blurhash="blurhashes[Math.floor(Math.random() * blurhashes.length)]"
          :onLoad="false"
        />
      </div>
      <div class="p-3 pt-1 flex flex-col">
        <div class="line-clamp-2 h-12">
          <span class="text-md break-words">{{ group.name }}</span>
        </div>
        <div class="flex flex-row-reverse items-center justify-between">
          <div class="flex -space-x-1 overflow-hidden p-1 pr-1 min-h-[2rem]" v-if="group.members">
            <div
              v-if="group.type === 'PUBLIC'"
              v-for="member in previewMembers"
              :key="member.id"
              class="inline-block h-6 w-6 rounded-full ring-2 ring-white"
            >
              <lazy-image
                class="rounded-xl object-cover h-6 w-6"
                :src="member.avatar.name"
                :blurhash="member.avatar?.blurhash"
                rounded="full"
              />
            </div>
          </div>
          <span class="text-xs text-gray-400">
            <span v-if="group.type === 'PUBLIC'"> Öffentlich</span><span v-else> Privat</span> -
            <span class="font-mono">{{ numberFormatter(memberCount) }} </span>
            <span v-if="memberCount === 1"> Mitglied</span><span v-else> Mitglieder</span>
          </span>
        </div>
      </div>
      <div class="mb-2 px-2">
        <button
          class="
            w-full
            inline-flex
            items-center
            justify-center
            px-4
            py-2
            border border-transparent
            text-sm
            font-medium
            rounded-xl
            shadow-sm
            text-white
            dark:bg-dark-600
            bg-gray-500
            hover:bg-brand-700
            focus:outline-none
            focus:ring-2 focus:ring-offset-2
            dark:focus:ring-offset-dark-700
            focus:ring-brand-500
          "
          @click="
            $router.push({
              name: 'Group',
              params: {
                id: group.id,
              },
            })
          "
        >
          <div class="flex items-center">
            <span v-if="!isMemberOfGroup">Gruppe beitreten</span>
            <svg
              v-else
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="stroke-white"
            >
              <g
                id="Iconly/Light/Arrow---Right"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <g
                  id="Arrow---Right"
                  transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000) translate(5.500000, 4.000000)"
                  stroke-width="2.5"
                >
                  <line x1="6.7743" y1="15.75" x2="6.7743" y2="0.75" id="Stroke-1"></line>
                  <polyline id="Stroke-3" points="12.7987 9.7002 6.7747 15.7502 0.7497 9.7002"></polyline>
                </g>
              </g>
            </svg>
          </div>
        </button>
      </div>
    </div>
  </card>
</template>

<script lang="ts">
import { Group } from '../../graphql/generated/types';
import { computed, defineComponent, PropType } from 'vue';
import Card from '../Card/Card.vue';
import LazyImage from '../Blurhash/LazyImage.vue';
import { numberFormatter } from '../../utils/numberFormatter';
export default defineComponent({
  props: {
    group: {
      type: Object as PropType<Group>,
      required: true,
    },
    isMemberOfGroup: {
      type: Boolean,
      default: false,
    },
  },
  components: { Card, LazyImage },
  setup(props) {
    const blurhashes = [
      'LJIzs5=D5uK$^aJWKP#*wd]fnlK5',
      'AePC3PmlGv{c',
      'LGF5]+Yk^6#M@-5c,1J5@[or[Q6.',
      'LGFFaXYk^6#M@-5c,1J5@[or[Q6.',
    ];
    const memberCount = computed(() => props.group.numberOfMembers || 0);
    const previewMembers = computed(() => props.group.members.slice(0, 2));
    return {
      numberFormatter,
      memberCount,
      blurhashes,
      previewMembers,
    };
  },
});
</script>
LazyImage

<style></style>
