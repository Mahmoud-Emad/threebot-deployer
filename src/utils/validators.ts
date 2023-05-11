/* eslint-disable no-useless-escape */
import type { FormControl } from 'tf-svelte-rx-forms';
import { ENGLISH_WORD_LIST } from './english_wordlist';
const { validators } = window.tfSvelteRxForms;

const SSH_REGEX =
  /^(sk-)?(ssh-rsa AAAAB3NzaC1yc2|ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNT|ecdsa-sha2-nistp384 AAAAE2VjZHNhLXNoYTItbmlzdHAzODQAAAAIbmlzdHAzOD|ecdsa-sha2-nistp521 AAAAE2VjZHNhLXNoYTItbmlzdHA1MjEAAAAIbmlzdHA1Mj|ssh-ed25519 AAAAC3NzaC1lZDI1NTE5|ssh-dss AAAAB3NzaC1kc3)[0-9A-Za-z+/]+[=]{0,3}( .*)?$/;

const EMAIL_REGEX =
  /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

export function isValidSSH(message: string) {
  return (ctrl: FormControl<string>) => {
    if (!SSH_REGEX.test(ctrl.value)) {
      return { isValidSSH: false, message };
    }
  };
}

export function ismnemonic(ctrl: FormControl<string>) {
  const v = ctrl.value;
  const message = "Mnemonic doesn't seem to be valid.";
  if (typeof v !== 'string') return { message };
  const words = new Set(v.split(' '));
  if (words.size !== 12) return { message };
  for (const word of words) {
    if (!ENGLISH_WORD_LIST.includes(word)) return { message };
  }
}

export const emailValidator = validators.pattern('Invalid email format.', {
  pattern: EMAIL_REGEX,
});
