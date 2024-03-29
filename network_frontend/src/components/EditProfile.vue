<template>
  <div class="dark:text-gray-50 text-dark-900">
    <div class="w-full">
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form>
          <div class="sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white dark:bg-dark-700 space-y-6 sm:p-6">
              <div>
                <label for="about" class="block text-sm font-medium text-gray-700 dark:text-gray-50 text-left">
                  Über dich
                </label>
                <div class="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    v-model="bio"
                    rows="3"
                    class="
                      resize-none
                      shadow-sm
                      focus:ring-brand-500 focus:border-indigo-500
                      mt-1
                      block
                      w-full
                      sm:text-sm
                      border-gray-black
                      dark:border-dark-500
                      rounded-md
                      dark:bg-dark-600
                    "
                    placeholder=""
                  />
                </div>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Teile deine Interessen, damit andere Nutzer dich besser kennen lernen
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-50 text-left"> Profilbild </label>
                <div class="mt-1 flex items-center">
                  <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    <img
                      v-if="newProfileImage"
                      :src="newProfileImage"
                      alt=""
                      class="object-cover h-12 w-12 bg-dark-700 border-white border rounded-full"
                    />
                    <lazy-image v-else :src="profileImage" :blurhash="blurhash" />
                  </span>
                  <button
                    @click="$refs.file.click()"
                    type="button"
                    class="
                      ml-5
                      bg-white
                      py-2
                      px-3
                      border border-gray-300
                      rounded-md
                      shadow-sm
                      text-sm
                      leading-4
                      font-medium
                      text-gray-700
                      hover:bg-gray-50
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500
                    "
                  >
                    Ändern
                  </button>
                  <input type="file" ref="file" style="display: none" @change="onFileChange($event)" />
                </div>
              </div>

              <Listbox as="div" v-model="selectedFaculty">
                <ListboxLabel class="block text-sm font-medium text-gray-700 dark:text-gray-50">
                  Fakultät
                </ListboxLabel>
                <div class="mt-2 relative">
                  <ListboxButton
                    class="
                      dark:bg-dark-600
                      bg-white
                      relative
                      min-h-[2.38rem]
                      w-full
                      border border-gray-800
                      dark:border-dark-400
                      rounded-md
                      shadow-sm
                      pl-3
                      pr-10
                      py-2
                      text-left
                      cursor-default
                      focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500
                      sm:text-sm
                    "
                  >
                    <span class="block truncate">{{ selectedFaculty.name }}</span>
                    <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        class="h-5 w-5 dark:stroke-white stroke-black"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 8.5L12 15.5L5 8.5"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  </ListboxButton>

                  <transition
                    leave-active-class="transition ease-in duration-100"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <ListboxOptions
                      class="
                        absolute
                        z-10
                        mt-1
                        w-full
                        bg-white
                        dark:bg-dark-600
                        shadow-lg
                        max-h-60
                        rounded-md
                        py-1
                        text-base
                        ring-1 ring-black ring-opacity-5
                        overflow-auto
                        focus:outline-none
                        sm:text-sm
                      "
                    >
                      <ListboxOption
                        as="template"
                        v-for="faculty in faculties"
                        :key="faculty.id"
                        :value="faculty"
                        v-slot="{ active, selected }"
                      >
                        <li
                          :class="[
                            active ? 'text-white bg-brand-600' : 'dark:text-gray-50 text-gray-900',
                            'cursor-default select-none relative py-2 pl-3 pr-9',
                          ]"
                        >
                          <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                            {{ faculty.name }}
                          </span>

                          <span
                            v-if="selected"
                            :class="[
                              active ? 'text-white' : 'text-brand-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            ]"
                          >
                          </span>
                        </li>
                      </ListboxOption>
                    </ListboxOptions>
                  </transition>
                </div>
              </Listbox>
              <Listbox as="div" v-model="selectedCourse">
                <ListboxLabel class="block text-sm font-medium text-gray-700 dark:text-gray-50 -mt-4">
                  Studiengang
                </ListboxLabel>
                <div class="mt-2 relative">
                  <ListboxButton
                    class="
                      dark:bg-dark-600
                      bg-white
                      relative
                      w-full
                      min-h-[2.38rem]
                      border border-gray-800
                      dark:border-dark-400
                      rounded-md
                      shadow-sm
                      pl-3
                      pr-10
                      py-2
                      text-left
                      cursor-default
                      focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500
                      sm:text-sm
                    "
                  >
                    <span class="block truncate">{{ selectedCourse.name }}</span>
                    <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        class="h-5 w-5 dark:stroke-white stroke-black"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 8.5L12 15.5L5 8.5"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  </ListboxButton>

                  <transition
                    leave-active-class="transition ease-in duration-100"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <ListboxOptions
                      class="
                        absolute
                        z-10
                        mt-1
                        w-full
                        bg-white
                        dark:bg-dark-600
                        shadow-lg
                        max-h-60
                        rounded-md
                        py-1
                        text-base
                        ring-1 ring-black ring-opacity-5
                        overflow-auto
                        focus:outline-none
                        sm:text-sm
                      "
                    >
                      <ListboxOption
                        as="template"
                        v-for="course in courses"
                        :key="course.id"
                        :value="course"
                        v-slot="{ active, selected }"
                      >
                        <li
                          :class="[
                            active ? 'text-white bg-brand-600' : 'dark:text-gray-50 text-gray-900',
                            'cursor-default select-none relative py-2 pl-3 pr-9',
                          ]"
                        >
                          <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                            {{ course.name }}
                          </span>

                          <span
                            v-if="selected"
                            :class="[
                              active ? 'text-white' : 'text-brand-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            ]"
                          >
                          </span>
                        </li>
                      </ListboxOption>
                    </ListboxOptions>
                  </transition>
                </div>
              </Listbox>
              <label for="interests" class="block text-sm font-medium text-gray-700 dark:text-gray-50 !mt-2 text-left">
                Interessen
              </label>
              <input-field id="interests" class="!mt-2" v-model="interests" inputClasses="!pr-0"></input-field>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-50"> Profilbanner </label>
                <div
                  v-if="!newBannerImage"
                  class="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                >
                  <div class="space-y-1 text-center">
                    <svg
                      class="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div class="flex text-sm text-gray-600">
                      <label
                        for="file-upload"
                        class="
                          relative
                          cursor-pointer
                          bg-white
                          dark:bg-dark-700
                          rounded-md
                          font-medium
                          text-brand-500
                          hover:text-brand-400
                          focus-within:outline-none
                          focus-within:ring-2
                          focus-within:ring-offset-2
                          focus-within:ring-brand-500
                        "
                      >
                        <span>Lade eine Datei hoch</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          class="sr-only"
                          @change="onBannerChanged($event)"
                        />
                      </label>
                      <!-- <p class="pl-1 dark:text-gray-400">oder nutze drag und drop</p> -->
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF bis zu 10MB</p>
                  </div>
                </div>
                <div v-else id="preview" class="flex flex-col items-center relative mt-5">
                  <img class="w-full rounded-lg h-52 object-cover border" :src="newBannerImage" />
                  <button
                    @click="
                      () => {
                        newBannerImage = '';
                        banner = undefined;
                      }
                    "
                    class="
                      z-50
                      absolute
                      left-2
                      top-2
                      bg-black
                      text-white
                      bg-opacity-80
                      hover:stroke-red hover:fill-red
                      fill-white
                      transition
                      shadow
                      rounded-full
                      h-8
                      w-8
                      flex
                      items-center
                      justify-center
                      focus:outline-none focus:ring-2 focus:ring-white
                    "
                  >
                    <svg viewBox="0 0 24 24" class="">
                      <g>
                        <path
                          d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"
                        ></path>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div v-for="(error, index) in v.$errors" :key="index" class="text-red-500">
                {{ error.$message }}
                <span v-if="v.interests.$error">aktuell: {{ interests.length }}</span>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 dark:bg-dark-700 text-right sm:px-6">
              <app-button class="bg-dark-400 mr-2 hover:!bg-red-600" @click.prevent="$emit('close')">
                Abbrechen</app-button
              >
              <app-button :disabled="loading" @click.prevent="updateProfile">
                Speichern
                <svg
                  class="animate-spin ml-2 mr-1 h-5 w-5 text-white"
                  v-if="loading"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </app-button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useUpdateProfileMutation } from '../graphql/generated/types';
import { computed, defineComponent, ref } from 'vue';
import InputField from './Form/InputField.vue';
import { userByUsername } from '../graphql/queries/userByUsername';
import LazyImage from './Blurhash/LazyImage.vue';
import useVuelidate from '@vuelidate/core';
import { maxLength, helpers } from '@vuelidate/validators';
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue';
import { courses, faculties } from '../universityData';

export default defineComponent({
  components: { InputField, LazyImage, Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions },
  emits: ['close'],
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const selectedFaculty = ref(faculties.find((f) => f.name == props.user?.faculty) || faculties[0]);
    const selectedCourse = ref(courses.find((c) => c.name == props.user?.studyCourse) || courses[0]);
    const bio = ref(props.user?.bio || '');
    const faculty = ref(props.user?.faculty);
    const interests = ref(props.user?.interests);
    const profileImage = ref(props.user?.avatar.name);
    const blurhash = ref(props.user?.avatar.blurhash);

    const studycourse = ref(props.user?.studyCourse);
    const file = ref<File>();
    const banner = ref<File>();
    const newProfileImage = ref();
    const newBannerImage = ref();

    //create the mutation to update the profile
    const { mutate: update, loading } = useUpdateProfileMutation(() => ({
      variables: {
        input: {
          bio: bio.value,
          faculty: selectedFaculty.value.name,
          interests: interests.value,
          studyCourse: selectedCourse.value.name,
          avatar: file.value,
          banner: banner.value,
        },
      },
      context: {
        hasUpload: true,
      },
      refetchQueries: [
        {
          query: userByUsername,
          variables: { username: props.user?.username },
        },
      ],
    }));

    //input validation rules
    const rules = computed(() => ({
      bio: {
        maxLength: helpers.withMessage('Über dich darf maximal 250 Zeichen lang sein', maxLength(250)),
      },
      studycourse: {
        maxLength: helpers.withMessage('Der Studiengang hat eine maximale Länge von 75 Zeichen', maxLength(75)),
      },
      interests: {
        maxLength: helpers.withMessage(`Dieses Feld darf maximal 100 Zeichen beinhalten,`, maxLength(100)),
      },
    }));

    const v = useVuelidate(rules, { bio, studycourse, interests });

    /**
     * generates a preview for the image if choosen
     */
    const onFileChange = (e: any) => {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      file.value = files[0];
      newProfileImage.value = URL.createObjectURL(files[0]);
    };

    /**
     * generates a preview for the bannerimage if choosen
     */
    const onBannerChanged = (e: any) => {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      banner.value = files[0];
      newBannerImage.value = URL.createObjectURL(files[0]);
    };

    /**
     * validates the input and updates the post
     */
    const updateProfile = async () => {
      v.value.$touch();
      if (v.value.$errors.length === 0) {
        try {
          await update();
        } finally {
          emit('close');
        }
      }
    };

    return {
      loading,
      faculty,
      interests,
      studycourse,
      bio,
      banner,
      updateProfile,
      onFileChange,
      onBannerChanged,
      profileImage,
      newProfileImage,
      newBannerImage,
      blurhash,
      faculties,
      selectedFaculty,
      courses,
      selectedCourse,
      v,
    };
  },
});
</script>
<style></style>
