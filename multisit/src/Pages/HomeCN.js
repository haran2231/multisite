// src/pages/HomeEN.js
import React from 'react';
import { useTranslation } from 'react-i18next';

function HomeCN() {
  const { t } = useTranslation();
  console.log(t);
  return (
    <div>
      <h1>{t('welcome')}</h1>
    </div>
  );
}

export default HomeCN;
