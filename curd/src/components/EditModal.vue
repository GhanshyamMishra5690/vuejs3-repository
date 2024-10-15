<script setup lang="ts">
import { defineEmits } from "vue";
import { useForm, Form, Field } from "vee-validate";
import * as Yup from "yup";
import { reactive, ref } from "vue";

// Define the event for closing the modal
const emit = defineEmits(["close"]);

const schema = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  role: Yup.string().required("Role is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  acceptTerms: Yup.string().required("Accept Ts & Cs is required"),
});
interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms?: string;
}

const formData = reactive<FormData>({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const onSubmit = (values: formData) => {
  alert("SUCCESS!! :-)\n\n" + JSON.stringify(values, null, 4));
};
</script>

<template>
  <div
    class="modal"
    style="display: block; background-color: rgba(0, 0, 0, 0.5);"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Registration</h5>
          <button type="button" class="close" @click="emit('close')">
            &times;
          </button>
        </div>
        <div class="modal-body">
          <Form
            @submit="onSubmit"
            :validation-schema="schema"
            v-slot="{ errors }"
          >
            <div class="form-group col mb-3">
              <label>Full Name</label>
              <Field
                name="name"
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
                class="form-control"
                :class="{ 'is-invalid': errors.role }"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
              </Field>
              <div class="invalid-feedback">{{ errors.role }}</div>
            </div>
            <div class="form-row">
              <div class="form-group col mb-3">
                <label>Password</label>
                <Field
                  name="password"
                  type="password"
                  class="form-control"
                  :class="{ 'is-invalid': errors.password }"
                />
                <div class="invalid-feedback">{{ errors.password }}</div>
              </div>
              <div class="form-group col mb-3">
                <label>Confirm Password</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  class="form-control"
                  :class="{ 'is-invalid': errors.confirmPassword }"
                />
                <div class="invalid-feedback">{{ errors.confirmPassword }}</div>
              </div>
            </div>
            <div class="form-group form-check">
              <Field
                name="acceptTerms"
                type="checkbox"
                id="acceptTerms"
                value="true"
                class="form-check-input"
                :class="{ 'is-invalid': errors.acceptTerms }"
              />
              <label for="acceptTerms" class="form-check-label"
                >Accept Terms & Conditions</label
              >
              <div class="invalid-feedback">{{ errors.acceptTerms }}</div>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary mr-1">
                Submit
              </button>
              <button
                type="reset"
                @click="emit('close')"
                class="btn btn-secondary"
              >
                Reset
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>
