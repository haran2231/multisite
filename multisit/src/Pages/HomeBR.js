// src/pages/HomeEN.js
import React from 'react';
import { useTranslation } from 'react-i18next';

function HomeBR() {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('welcome')}</h1>
    </div>
  );
}

export default HomeBR;
