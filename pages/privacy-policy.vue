<template>
  <div class="h-full flex flex-col">
    <div class="h-fit">
      <AuthHeader />
    </div>
    <div class="container text-gray-500 h-full mx-auto px-8 md:px-60 py-8 ">
      <h2 class="text-2xl font-semibold text-gray-600 mb-4">Privacy Policy</h2>
      <h3 class="text-lg font-semibold text-gray-600 mt-6 mb-3">Data Processing Agreement</h3>
      <p class="text-gray-600 font-bold">The following sets out the details of processing as required by Article 28 of
        GDPR</p>
      <div class="mt-3">
        We reserve the sole right at any time to modify, discontinue or terminate our services, or modify these terms
        without notice. It is your responsibility to check these terms periodically for changes. By continuing to use our
        services after we make and post any such modification, you agree to be legally bound by the revised terms. You may
        not alter these terms without our express written consent.
      </div>
      <p class="text-gray-600 mt-7 font-bold">Please specify the purposes for which the Data Processor intends to process
        the Personal Data.</p>
      <div class="mt-2">
        Cuota Infotech provides dashboarding and intelligence on leads, sales, marketing and delivery data .
      </div>
      <div class="mt-4">
        Confra: client company data
      </div>
      <p class="text-gray-600 mt-7 font-bold">Please specify the categories of Personal Data that shall be processed under
        this Agreement.</p>
      <div class="mt-2">
        Cuota Infotech: Browser cookies, IP addresses, website interactions, name, company, email, telephone, other
        information pertained to calls, leads,delivery and renewal information.
      </div>
      <div class="mt-4">
        Confra: Company data as uploaded by clients as well as email recipient information.
      </div>
      <p class="text-gray-600 mt-7 font-bold">Please specify how long you think the Personal Data will be retained for,
        where possible.</p>
      <div class="mt-2">
        Retention for pseudonymous identifiers (cookie and IP address) is expected to be 1-2 years.
      </div>
      <div class="mt-6">
        Where possible, please describe the measures put in place under Article 32(1) GDPR.
      </div>
      <div class="mt-2">
        Cuota Infotech have implemented appropriate organisational measures through our Information Security
        policies/procedures and our Security and GDPR Awareness training programmes.
      </div>
      <div class="mt-2">
        Database backups are encrypted. Inbound traffic is only permitted via an AWS WAF. Application logs are written to
        a central/auditable service. Access to the Database layer is only possible by our senior engineers through a
        secured client VPN.
      </div>
      <p class="text-gray-600 mt-7 font-bold">List the sub-processors who will process Personal Data.</p>
      <div class="mt-4">
        Cuota Infotech
      </div>
      <!-- Add more sections as needed -->
    </div>
    <div class="h-fit">
      <AppFooter />
  </div>
</div></template>
<script setup lang="ts">
import AuthHeader from '@/layouts/AuthHeader'
import AppFooter from '@/layouts/AppFooter'
definePageMeta({
  layout: 'login-layout',
});
</script>