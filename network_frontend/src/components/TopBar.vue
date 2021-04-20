<template>
  <header
    v-if="show && $route?.name !== 'Login' && $route?.name !== 'Register'"
    class="fixed bg-white dark:bg-dark700 shadow-sm w-full lg:overflow-y-visible z-40"
  >
    <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
        <div class="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
          <div class="flex-shrink-0 flex items-center flex-row cursor-pointer" @click="$router.push('/home')">
            <img
              class="block h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
              alt="Workflow"
            />
            <div
              v-if="breakpoints.is != 'md' && breakpoints.is != 'sm'"
              class="text-gray-900 dark:text-gray-50 ml-5 text-xl font-semibold"
            >
              SocialCampus {{}}
            </div>
          </div>
          <div
            v-if="breakpoints.is != 'sm' && breakpoints.is != 'md' && breakpoints.is != 'lg'"
            class="pl-28 font-bold text-xl flex-shrink-0 flex items-center dark:text-gray-50 text-gray-900"
          >
            <span v-if="user"></span>Hey {{ user?.firstname }} 👋
          </div>
        </div>
        <div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-4 xl:col-start-5">
          <div class="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
            <div class="w-full">
              <label for="search" class="sr-only">Search</label>
              <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center"></div>
                <search class="h-8" />
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden dark:bg-dark700 bg-white">
          <!-- Mobile menu button -->
          <button
            type="button"
            class="-mx-2 rounded-md p-2 inline-flex items-center justify-center bg-white dark:bg-dark600 text-gray-400 hover:bg-gray-100 dark:hover:bg-dark700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            aria-expanded="false"
            @click="openMobileMenu"
          >
            <span class="sr-only">Open menu</span>
            <svg
              class="block h-6 w-6 dark:text-gray-50 text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              class="hidden h-6 w-6 dark:text-gray-50 text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4" id="notify-button" ref="notifyTarget">
          <div
            @click="notifyOpen = !notifyOpen"
            class="hover:opacity-70 relative cursor-pointer ml-5 flex-shrink-0 border-2 border-dark800 dark:border-gray-500 rounded-full p-1 py-2 px-2 text-gray-200 hover:text-gray-500 focus:outline-none dark:focus:ring-offset-dark700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="sr-only">View notifications</span>
            <svg
              viewBox="0 0 24 24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="h-8 dark:stroke-white stroke-black dark:fill-dark600 fill-white"
            >
              <g
                id="Iconly/Light/Notification"
                stroke-width="1"
                fill-rule="evenodd"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <g id="Notification" transform="translate(3.500000, 2.000000)" stroke-width="1.5">
                  <path
                    d="M8.5,15.8476424 C14.13923,15.8476424 16.7480515,15.1242108 17,12.220506 C17,9.31879687 15.1811526,9.50539234 15.1811526,5.94511102 C15.1811526,3.16414015 12.5452291,-1.86517468e-14 8.5,-1.86517468e-14 C4.4547709,-1.86517468e-14 1.81884743,3.16414015 1.81884743,5.94511102 C1.81884743,9.50539234 0,9.31879687 0,12.220506 C0.252952291,15.135187 2.86177374,15.8476424 8.5,15.8476424 Z"
                    id="Stroke-1"
                  ></path>
                  <path
                    d="M10.8887931,18.8572176 C9.52465753,20.3719337 7.3966462,20.3898948 6.0194615,18.8572176"
                    id="Stroke-3"
                  ></path>
                </g>
              </g>
            </svg>
            <span
              v-if="notifications && notifications.length > 0"
              class="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-dark-700 bg-green-400"
            />
          </div>

          <div class="relative" @click.stop>
            <transition name="fade">
              <notifications
                v-if="notifyOpen"
                @click.prevent
                @closeNotify="notifyOpen = false"
                @deleteNotification="deleteNotification($event)"
                :notifications="notifications"
              />
            </transition>
          </div>

          <!-- Profile dropdown -->
          <div class="flex-shrink-0 relative ml-5" ref="target">
            <div>
              <button
                id="user-menu"
                type="button"
                class="p-1 rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500"
                aria-haspopup="true"
                @click="showProfileMenu = !showProfileMenu"
              >
                <span class="sr-only">Open user menu</span>
                <img class="h-10 w-10 rounded-full bg-dark700" :src="profileImage" alt="" />
              </button>
            </div>

            <transition name="fade">
              <div
                v-if="showProfileMenu"
                @click.stop
                class="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-dark800 ring-1 ring-black ring-opacity-5 border-dark500 border"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <div class="flex items-center dark:hover:bg-dark600 hover:bg-gray-100 transition duration-100">
                  <svg
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    class="dark:stroke-white stroke-black h-6 ml-2"
                  >
                    <g
                      id="Iconly/Light/Profile"
                      stroke-width="1.5"
                      fill="none"
                      fill-rule="evenodd"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <g id="Profile" transform="translate(4.814286, 2.814476)">
                        <path
                          d="M7.17047619,12.531714 C3.30285714,12.531714 -4.08562073e-14,13.1164759 -4.08562073e-14,15.4583807 C-4.08562073e-14,17.8002854 3.28190476,18.4059997 7.17047619,18.4059997 C11.0380952,18.4059997 14.34,17.8202854 14.34,15.479333 C14.34,13.1383807 11.0590476,12.531714 7.17047619,12.531714 Z"
                          id="Stroke-1"
                          stroke-width="2"
                        ></path>
                        <path
                          d="M7.17047634,9.19142857 C9.70857158,9.19142857 11.7657144,7.13333333 11.7657144,4.5952381 C11.7657144,2.05714286 9.70857158,-5.32907052e-15 7.17047634,-5.32907052e-15 C4.6323811,-5.32907052e-15 2.574259,2.05714286 2.574259,4.5952381 C2.56571443,7.1247619 4.60952396,9.18285714 7.13809539,9.19142857 L7.17047634,9.19142857 Z"
                          id="Stroke-3"
                          stroke-width="2"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  <a
                    @click="
                      () => {
                        if (user?.username) {
                          $router.push({
                            name: 'Profile',
                            params: {
                              id: user.username,
                            },
                          });
                        }

                        showProfileMenu = false;
                      }
                    "
                    class="block py-2 pl-5 w-full px-4 text-sm dark:text-gray-100 text-gray-700 cursor-pointer"
                    role="menuitem"
                    >Dein Profil</a
                  >
                </div>
                <div class="flex items-center dark:hover:bg-dark600 hover:bg-gray-100 transition duration-100">
                  <!-- settings icon -->
                  <svg
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    class="h-6 ml-1.5 dark:stroke-white stroke-black"
                  >
                    <g
                      id="Iconly/Light/Setting"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <g id="Setting" transform="translate(2.500000, 1.500000)" stroke-width="1.5">
                        <path
                          d="M18.3066362,6.12356982 L17.6842106,5.04347829 C17.1576365,4.12955711 15.9906873,3.8142761 15.0755149,4.33867279 L15.0755149,4.33867279 C14.6398815,4.59529992 14.1200613,4.66810845 13.6306859,4.54104256 C13.1413105,4.41397667 12.7225749,4.09747295 12.4668193,3.66132725 C12.3022855,3.38410472 12.2138742,3.06835005 12.2105264,2.74599544 L12.2105264,2.74599544 C12.2253694,2.22917739 12.030389,1.72835784 11.6700024,1.3576252 C11.3096158,0.986892553 10.814514,0.777818938 10.2974829,0.778031878 L9.04347831,0.778031878 C8.53694532,0.778031878 8.05129106,0.97987004 7.69397811,1.33890085 C7.33666515,1.69793166 7.13715288,2.18454839 7.13958814,2.69107553 L7.13958814,2.69107553 C7.12457503,3.73688099 6.27245786,4.57676682 5.22654465,4.57665906 C4.90419003,4.57331126 4.58843537,4.48489995 4.31121284,4.32036615 L4.31121284,4.32036615 C3.39604054,3.79596946 2.22909131,4.11125048 1.70251717,5.02517165 L1.03432495,6.12356982 C0.508388616,7.03634945 0.819378585,8.20256183 1.72997713,8.73226549 L1.72997713,8.73226549 C2.32188101,9.07399614 2.68650982,9.70554694 2.68650982,10.3890161 C2.68650982,11.0724852 2.32188101,11.704036 1.72997713,12.0457667 L1.72997713,12.0457667 C0.820534984,12.5718952 0.509205679,13.7352837 1.03432495,14.645309 L1.03432495,14.645309 L1.6659039,15.7345539 C1.9126252,16.1797378 2.3265816,16.5082503 2.81617164,16.6473969 C3.30576167,16.7865435 3.83061824,16.7248517 4.27459956,16.4759726 L4.27459956,16.4759726 C4.71105863,16.2212969 5.23116727,16.1515203 5.71931837,16.2821523 C6.20746948,16.4127843 6.62321383,16.7330005 6.87414191,17.1716248 C7.03867571,17.4488473 7.12708702,17.764602 7.13043482,18.0869566 L7.13043482,18.0869566 C7.13043482,19.1435014 7.98693356,20.0000001 9.04347831,20.0000001 L10.2974829,20.0000001 C11.3504633,20.0000001 12.2054882,19.1490783 12.2105264,18.0961099 L12.2105264,18.0961099 C12.2080776,17.5879925 12.4088433,17.0999783 12.7681408,16.7406809 C13.1274382,16.3813834 13.6154524,16.1806176 14.1235699,16.1830664 C14.4451523,16.1916732 14.7596081,16.2797208 15.0389017,16.4393593 L15.0389017,16.4393593 C15.9516813,16.9652957 17.1178937,16.6543057 17.6475973,15.7437072 L17.6475973,15.7437072 L18.3066362,14.645309 C18.5617324,14.2074528 18.6317479,13.6859659 18.5011783,13.1963297 C18.3706086,12.7066935 18.0502282,12.2893121 17.6109841,12.0366133 L17.6109841,12.0366133 C17.17174,11.7839145 16.8513595,11.3665332 16.7207899,10.876897 C16.5902202,10.3872608 16.6602358,9.86577384 16.9153319,9.42791767 C17.0812195,9.13829096 17.3213574,8.89815312 17.6109841,8.73226549 L17.6109841,8.73226549 C18.5161253,8.20284891 18.8263873,7.04344892 18.3066362,6.13272314 L18.3066362,6.13272314 L18.3066362,6.12356982 Z"
                          id="Path_33946"
                        ></path>
                        <circle id="Ellipse_737" cx="9.67505726" cy="10.3890161" r="2.63615562"></circle>
                      </g>
                    </g>
                  </svg>

                  <a href="#" class="block py-2 px-4 text-sm dark:text-gray-100 text-gray-700" role="menuitem"
                    >Einstellungen</a
                  >
                </div>
                <div
                  class="flex items-center justify-center dark:hover:bg-dark600 hover:bg-gray-100 transition duration-100"
                ></div>
                <div class="flex items-center dark:hover:bg-dark600 hover:bg-gray-100 transition duration-100">
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    class="h-6 ml-2 dark:stroke-white stroke-black"
                  >
                    <g
                      id="Iconly/Light/Logout"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <g id="Logout" transform="translate(2.000000, 2.000000)" stroke-width="1.5">
                        <path
                          d="M13.016,5.3895 L13.016,4.4565 C13.016,2.4215 11.366,0.7715 9.331,0.7715 L4.456,0.7715 C2.422,0.7715 0.772,2.4215 0.772,4.4565 L0.772,15.5865 C0.772,17.6215 2.422,19.2715 4.456,19.2715 L9.341,19.2715 C11.37,19.2715 13.016,17.6265 13.016,15.5975 L13.016,14.6545"
                          id="Stroke-1"
                        ></path>
                        <line x1="19.8095" y1="10.0214" x2="7.7685" y2="10.0214" id="Stroke-3"></line>
                        <polyline id="Stroke-5" points="16.8812 7.1063 19.8092 10.0213 16.8812 12.9373"></polyline>
                      </g>
                    </g>
                  </svg>
                  <a
                    href="#"
                    class="block py-2 px-4 text-sm dark:text-gray-100 text-gray-700"
                    role="menuitem"
                    @click="logout"
                    >Ausloggen</a
                  >
                </div>
              </div>
            </transition>
          </div>

          <app-button v-if="['Home', 'Browse'].includes($route.name)" class="ml-6" @click="modal.openModal()">
            Neuer Post
            <svg
              viewBox="0 0 24 24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="ml-2 h-6 w-6"
            >
              <g id="Iconly/Bulk/Send" stroke="none" stroke-width="1" fill-rule="evenodd">
                <g id="Send" transform="translate(2.000000, 2.000000)" fill-rule="nonzero">
                  <path
                    d="M19.4274202,0.578298605 C18.9274202,0.0672986048 18.1874202,-0.121701395 17.4974202,0.0782986048 L1.40742017,4.7272986 C0.679420165,4.9292986 0.163420165,5.5062986 0.024420165,6.2382986 C-0.117579835,6.9842986 0.378420165,7.9322986 1.02642017,8.3282986 L6.05742017,11.4002986 C6.57342017,11.7162986 7.23942017,11.6372986 7.66642017,11.2092986 L13.4274202,5.4482986 C13.7174202,5.1472986 14.1974202,5.1472986 14.4874202,5.4482986 C14.7774202,5.7372986 14.7774202,6.2082986 14.4874202,6.5082986 L8.71642017,12.2692986 C8.28842017,12.6972986 8.20842017,13.3612986 8.52342017,13.8782986 L11.5974202,18.9282986 C11.9574202,19.5272986 12.5774202,19.8682986 13.2574202,19.8682986 C13.3374202,19.8682986 13.4274202,19.8682986 13.5074202,19.8572986 C14.2874202,19.7582986 14.9074202,19.2272986 15.1374202,18.4772986 L19.9074202,2.5082986 C20.1174202,1.8282986 19.9274202,1.0882986 19.4274202,0.578298605"
                    id="Fill-1"
                    class="fill-white"
                  ></path>
                  <path
                    d="M7.45142017,17.1421986 C7.74342017,17.4351986 7.74342017,17.9101986 7.45142017,18.2031986 L6.08542017,19.5681986 C5.93942017,19.7151986 5.74742017,19.7881986 5.55542017,19.7881986 C5.36342017,19.7881986 5.17142017,19.7151986 5.02542017,19.5681986 C4.73242017,19.2751986 4.73242017,18.8011986 5.02542017,18.5081986 L6.39042017,17.1421986 C6.68342017,16.8501986 7.15842017,16.8501986 7.45142017,17.1421986 Z M6.66772017,13.3541986 C6.95972017,13.6471986 6.95972017,14.1221986 6.66772017,14.4151986 L5.30172017,15.7801986 C5.15572017,15.9271986 4.96372017,16.0001986 4.77172017,16.0001986 C4.57972017,16.0001986 4.38772017,15.9271986 4.24172017,15.7801986 C3.94872017,15.4871986 3.94872017,15.0131986 4.24172017,14.7201986 L5.60672017,13.3541986 C5.89972017,13.0621986 6.37472017,13.0621986 6.66772017,13.3541986 Z M2.90652017,12.1617986 C3.19852017,12.4547986 3.19852017,12.9297986 2.90652017,13.2227986 L1.54052017,14.5877986 C1.39452017,14.7347986 1.20252017,14.8077986 1.01052017,14.8077986 C0.818520165,14.8077986 0.626520165,14.7347986 0.480520165,14.5877986 C0.187520165,14.2947986 0.187520165,13.8207986 0.480520165,13.5277986 L1.84552017,12.1617986 C2.13852017,11.8697986 2.61352017,11.8697986 2.90652017,12.1617986 Z"
                    id="Combined-Shape"
                    opacity="0.400000006"
                    class="fill-white"
                  ></path>
                </g>
              </g>
            </svg>
          </app-button>
          <div v-if="$route.name === 'Group'">
            <group-permission-container :groupId="$route.params.id">
              <template v-slot:onlyMember>
                <app-button class="ml-6" @click="modal.openModal()">
                  Neuer Post
                  <svg
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    class="ml-2 h-6 w-6"
                  >
                    <g id="Iconly/Bulk/Send" stroke="none" stroke-width="1" fill-rule="evenodd">
                      <g id="Send" transform="translate(2.000000, 2.000000)" fill-rule="nonzero">
                        <path
                          d="M19.4274202,0.578298605 C18.9274202,0.0672986048 18.1874202,-0.121701395 17.4974202,0.0782986048 L1.40742017,4.7272986 C0.679420165,4.9292986 0.163420165,5.5062986 0.024420165,6.2382986 C-0.117579835,6.9842986 0.378420165,7.9322986 1.02642017,8.3282986 L6.05742017,11.4002986 C6.57342017,11.7162986 7.23942017,11.6372986 7.66642017,11.2092986 L13.4274202,5.4482986 C13.7174202,5.1472986 14.1974202,5.1472986 14.4874202,5.4482986 C14.7774202,5.7372986 14.7774202,6.2082986 14.4874202,6.5082986 L8.71642017,12.2692986 C8.28842017,12.6972986 8.20842017,13.3612986 8.52342017,13.8782986 L11.5974202,18.9282986 C11.9574202,19.5272986 12.5774202,19.8682986 13.2574202,19.8682986 C13.3374202,19.8682986 13.4274202,19.8682986 13.5074202,19.8572986 C14.2874202,19.7582986 14.9074202,19.2272986 15.1374202,18.4772986 L19.9074202,2.5082986 C20.1174202,1.8282986 19.9274202,1.0882986 19.4274202,0.578298605"
                          id="Fill-1"
                          class="fill-white"
                        ></path>
                        <path
                          d="M7.45142017,17.1421986 C7.74342017,17.4351986 7.74342017,17.9101986 7.45142017,18.2031986 L6.08542017,19.5681986 C5.93942017,19.7151986 5.74742017,19.7881986 5.55542017,19.7881986 C5.36342017,19.7881986 5.17142017,19.7151986 5.02542017,19.5681986 C4.73242017,19.2751986 4.73242017,18.8011986 5.02542017,18.5081986 L6.39042017,17.1421986 C6.68342017,16.8501986 7.15842017,16.8501986 7.45142017,17.1421986 Z M6.66772017,13.3541986 C6.95972017,13.6471986 6.95972017,14.1221986 6.66772017,14.4151986 L5.30172017,15.7801986 C5.15572017,15.9271986 4.96372017,16.0001986 4.77172017,16.0001986 C4.57972017,16.0001986 4.38772017,15.9271986 4.24172017,15.7801986 C3.94872017,15.4871986 3.94872017,15.0131986 4.24172017,14.7201986 L5.60672017,13.3541986 C5.89972017,13.0621986 6.37472017,13.0621986 6.66772017,13.3541986 Z M2.90652017,12.1617986 C3.19852017,12.4547986 3.19852017,12.9297986 2.90652017,13.2227986 L1.54052017,14.5877986 C1.39452017,14.7347986 1.20252017,14.8077986 1.01052017,14.8077986 C0.818520165,14.8077986 0.626520165,14.7347986 0.480520165,14.5877986 C0.187520165,14.2947986 0.187520165,13.8207986 0.480520165,13.5277986 L1.84552017,12.1617986 C2.13852017,11.8697986 2.61352017,11.8697986 2.90652017,12.1617986 Z"
                          id="Combined-Shape"
                          opacity="0.400000006"
                          class="fill-white"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </app-button>
              </template>
            </group-permission-container>
          </div>
        </div>
      </div>
    </div>
    <nav class="lg:hidden" :class="showMobileMenu ? 'block' : 'hidden'" aria-label="Global">
      <div class="border-t border-dark600 pt-4 pb-3">
        <div class="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" :src="profileImage" alt="" />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium dark:text-gray-50 text-gray-800">
              <span v-if="user"> {{ user?.firstname }}</span>
            </div>
            <div class="text-sm font-medium dark:text-gray-400 text-gray-500">
              <span v-if="user"> {{ user?.firstname }}</span>
            </div>
          </div>
          <button
            type="button"
            class="ml-auto flex-shrink-0 dark:bg-dark700 bg-white rounded-full p-1 text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark700 focus:ring-indigo-500"
          >
            <span class="sr-only">View notifications</span>
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
        </div>
        <div class="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4 block">
          <div
            @click="
              () => {
                if (user?.username) {
                  $router.push({
                    name: 'Profile',
                    params: {
                      id: user?.username,
                    },
                  });
                }
                showMobileMenu = false;
              }
            "
            class="block rounded-md py-2 px-3 text-base font-medium dark:text-gray-50 text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:hover:text-gray-50 dark:hover:bg-dark600"
          >
            Dein Profil
          </div>

          <div
            class="block rounded-md py-2 px-3 text-base font-medium dark:text-gray-50 text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:hover:text-gray-50 dark:hover:bg-dark600"
          >
            Einstellungen
          </div>

          <div
            @click="logout"
            class="block rounded-md py-2 px-3 text-base font-medium dark:text-gray-50 text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:hover:text-gray-50 dark:hover:bg-dark600"
          >
            Ausloggen
          </div>
        </div>
      </div>
    </nav>
  </header>

  <floating-button
    v-if="['Home', 'Browse'].includes($route.name)"
    class="lg:hidden sm:block"
    text="Neuer Post"
    @click="modal.openModal()"
  />
  <div v-if="$route.name === 'Group'">
    <group-permission-container :groupId="$route.params.id">
      <template v-slot:onlyMember>
        <floating-button
          v-if="['Group'].includes($route.name)"
          class="lg:hidden sm:block"
          text="Neuer Post"
          @click="modal.openModal()"
        />
      </template>
    </group-permission-container>
  </div>
  <modal ref="modal" content-text="" header-text="Neuer Post">
    <new-post @close="modal.closeModal()" />
  </modal>
  <edit-modal content-text="" header-text="Edit Post" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Modal from '@/components/Modal.vue';
import NewPost from './Post/NewPost.vue';
import EditPost from './Post/EditPost.vue';
import breakpoints from '../utils/breakpoints';
import { useGetNotificationsQuery, useMeQuery } from '../graphql/generated/graphqlOperations';
import { useResult } from '@vue/apollo-composable';
import { onLogout } from '../apollo';
import { onClickOutside } from '@vueuse/core';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import FloatingButton from './Form/FloatingButton.vue';
import Search from './Search.vue';
import Notifications from './Notifications.vue';
import EditModal from './Post/EditModal.vue';
import ToggleButton from './Form/ToggleButton.vue';
import { notificationsSubscription } from '../graphql/subscriptions/notifications';
import { Notification } from '../graphql/generated/types';
import GroupPermissionContainer from './Group/GroupPermissionContainer.vue';
import { RecursivePartial } from '../utils/typeUtils';

export default defineComponent({
  components: {
    Modal,
    NewPost,
    FloatingButton,
    Search,
    Notifications,
    EditModal,
    EditPost,
    ToggleButton,
    GroupPermissionContainer,
  },
  setup(props) {
    const showProfileMenu = ref(false);
    const showMobileMenu = ref(false);
    const show = ref(true);
    const target = ref(null);
    const router = useRouter();
    const notifyOpen = ref(false);
    const notifyTarget = ref(null);
    const notifications = ref<RecursivePartial<Notification>[]>([]);
    const store = useStore();
    const modal = ref<InstanceType<typeof Modal>>();

    onClickOutside(target, (event) => {
      showProfileMenu.value = false;
    });

    onClickOutside(notifyTarget, (event) => {
      notifyOpen.value = false;
    });

    const { result, error, onResult } = useMeQuery();

    const user = useResult(result, null, (data) => data.me);
    const profileImage = ref('');

    onResult(({ data: { me } }) => {
      store.dispatch('userData/setUser', me);
      profileImage.value = me?.profilePicLink || '';

      const { onResult: onNotifications, subscribeToMore, loading: notificationsLoading } = useGetNotificationsQuery();
      subscribeToMore(() => ({
        document: notificationsSubscription,
        variables: {
          userId: me?.id,
        },
      }));

      onNotifications(({ data }) => {
        notifications.value = data.getNotifications;
      });
    });

    const deleteNotification = (id: string) => {
      notifications.value = notifications.value.filter((n) => n.id != id);
    };

    profileImage.value = user?.value?.profilePicLink || '';

    const openMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value;
    };

    const logout = () => {
      onLogout();
      router.push('/login');
    };

    return {
      target,
      logout,
      show,
      showProfileMenu,
      user,
      breakpoints,
      openMobileMenu,
      showMobileMenu,
      profileImage,
      notifyOpen,
      notifyTarget,
      notifications,
      deleteNotification,
      modal,
    };
  },
});
</script>

<style>
.text-indent {
  text-indent: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
