<template>
  <div class="dark:text-gray-50 text-dark-900">
    <div class="w-full">
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form
          @submit.prevent="
            () => {
              updateProfile();
              $emit('close');
            }
          "
        >
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white dark:bg-dark700 space-y-6 sm:p-6">
              <div>
                <label for="about" class="block text-sm font-medium text-gray-700 dark:text-gray-50"> Über dich </label>
                <div class="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    v-model="bio"
                    rows="3"
                    class="resize-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-black dark:border-dark-500 rounded-md dark:bg-dark-600"
                    placeholder=""
                  />
                </div>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Teile deine Interessen, damit andere Nutzer dich besser kennen lernen
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-50"> Profilbild </label>
                <div class="mt-1 flex items-center">
                  <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    <!-- <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg> -->
                    <img
                      :src="newProfileImage ? newProfileImage : profileImage"
                      alt=""
                      class="object-cover h-12 w-12 bg-dark-700 border-white border rounded-full"
                    />
                  </span>
                  <button
                    @click="$refs.file.click()"
                    type="button"
                    class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Ändern
                  </button>
                  <input type="file" ref="file" style="display: none" @change="onFileChange($event)" />
                </div>
              </div>

              <label for="faculty" class="block text-sm font-medium text-gray-700 dark:text-gray-50"> Fakultät</label>
              <input-field id="faculty" class="!mt-2" v-model="faculty"></input-field>
              <label for="studycourse" class="block text-sm font-medium text-gray-700 dark:text-gray-50 !mt-2">
                Studiengang
              </label>
              <input-field id="studycourse" class="!mt-2" v-model="studycourse"></input-field>
              <label for="interests" class="block text-sm font-medium text-gray-700 dark:text-gray-50 !mt-2">
                Interessen
              </label>
              <input-field id="interests" class="!mt-2" v-model="interests"></input-field>

              <!-- <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-50"> Profilbanner </label>
                <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
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
                        class="relative cursor-pointer bg-white dark:bg-dark-700 rounded-md font-medium text-indigo-500 hover:text-indigo-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                      </label>
                      <p class="pl-1 dark:text-gray-400">or drag and drop</p>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div> -->
            </div>
            <div class="px-4 py-3 bg-gray-50 dark:bg-dark-700 text-right sm:px-6">
              <button
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useUpdateProfileMutation } from '../graphql/generated/types';
import { defineComponent, ref } from 'vue';
import InputField from './Form/InputField.vue';
import { userByUsername } from '../graphql/queries/userByUsername';

export default defineComponent({
  components: { InputField },
  emits: ['close'],
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const bio = ref(props.user?.bio || '');
    const faculty = ref(props.user?.faculty);
    const interests = ref(props.user?.interests);
    const profileImage = ref(props.user?.avatar.name);
    const newProfileImage = ref();
    const studycourse = ref(props.user?.studyCourse);
    const file = ref<File>();
    const { mutate: update } = useUpdateProfileMutation(() => ({
      variables: {
        input: {
          bio: bio.value,
          faculty: faculty.value,
          interests: interests.value,
          studyCourse: studycourse.value,
          avatar: file.value,
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

    const onFileChange = (e: any) => {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      file.value = files[0];
      newProfileImage.value = URL.createObjectURL(files[0]);
    };

    const updateProfile = () => {
      update();
    };

    return { faculty, interests, studycourse, bio, updateProfile, onFileChange, profileImage, newProfileImage };
  },
});
</script>
<style></style>
