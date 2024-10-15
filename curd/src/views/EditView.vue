<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";

import { useApiStore } from "@/stores/apiStore";
import { useForm, Form, Field } from "vee-validate";
import * as Yup from "yup";
import { useRoute, useRouter } from "vue-router";

import { useGlobalLoader } from "vue-global-loader";
const { displayLoader, destroyLoader } = useGlobalLoader();
import Swal from "sweetalert2";

const route = useRoute();
const router = useRouter();
const schema = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  role: Yup.string().required("Role is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  acceptTerms: Yup.string().required("Accept Ts & Cs is required"),
  avatar: Yup.mixed().required("Image is required"),
});
interface FormData {
  name: string;
  email: string;
  password: string;
  acceptTerms?: string;
  avatar: string;
}

const formData = ref<FormData>({
  name: "",
  email: "",
  password: "",
  acceptTerms: "",
  avatar: "",
});

const store = useApiStore();
const { resetForm } = useForm({
  validationSchema: schema,
});
onMounted(async () => {
  await store.getUser(route.params.id);
  const user = store.editUser;
  formData.value.name = user.name;
  formData.value.email = user.email;
  formData.value.role = user.role;
  formData.value.password = user.password;
  formData.value.avatar = user.avatar;
});
// const onSubmit = async (values) => {
//   displayLoader();
//   await store.updateUser(route.params.id, values);
//   router.push({ name: "home" });
//   destroyLoader();
// };
const onSubmit = async (values) => {
  try {
    Swal.fire({
      title: "Saving...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const response = await store.updateUser(route.params.id, values);
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "User Update successfully!",
    });
    router.push({ name: "home" });
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err || "Failed to Update user. Please try again.",
    });
  }
};
</script>

<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-6 .col-md-4">
        <div class="card m-3">
          <h5 class="card-header">
            Edit User
          </h5>
          <div class="card-body">
            <Form
              @submit="onSubmit"
              :validation-schema="schema"
              v-slot="{ errors }"
            >
              <div class="form-group col mb-3">
                <label>Full Name</label>
                <Field
                  name="name"
                  v-model="formData.name"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors.name }"
                />
                <div class="invalid-feedback">{{ errors.name }}</div>
              </div>

              <div class="form-group col mb-3">
                <label>Email</label>
                <Field
                  name="email"
                  v-model="formData.email"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors.email }"
                />
                <div class="invalid-feedback">{{ errors.email }}</div>
              </div>

              <div class="form-group col mb-3">
                <label>User Role</label>
                <Field
                  name="role"
                  as="select"
                  v-model="formData.role"
                  class="form-control"
                  :class="{ 'is-invalid': errors.role }"
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="customer">Customer</option>
                </Field>
                <div class="invalid-feedback">{{ errors.role }}</div>
              </div>

              <div class="form-group col mb-3">
                <label>Avatar</label>
                <Field
                  name="avatar"
                  class="form-control"
                  v-model="formData.avatar"
                  :class="{ 'is-invalid': errors.avatar }"
                >
                </Field>
                <div class="invalid-feedback">{{ errors.avatar }}</div>
              </div>

              <div class="form-row">
                <div class="form-group col mb-3">
                  <label>Password</label>
                  <Field
                    name="password"
                    v-model="formData.password"
                    type="password"
                    class="form-control"
                    :class="{ 'is-invalid': errors.password }"
                  />
                  <div class="invalid-feedback">{{ errors.password }}</div>
                </div>
              </div>
              <div class="form-group form-check">
                <Field
                  name="acceptTerms"
                  type="checkbox"
                  id="acceptTerms"
                  value="true"
                  class="form-check-input checked"
                  :class="{ 'is-invalid': errors.acceptTerms }"
                />
                <label for="acceptTerms" class="form-check-label"
                  >Accept Terms & Conditions</label
                >
                <div class="invalid-feedback">{{ errors.acceptTerms }}</div>
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
                <button
                  type="reset"
                  @click="reset"
                  class="btn btn-secondary m-3"
                >
                  Reset
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 600px;
}
</style>
