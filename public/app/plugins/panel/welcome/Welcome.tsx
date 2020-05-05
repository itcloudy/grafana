import React from 'react';
import { css } from 'emotion';
import { GrafanaTheme } from '@grafana/data';
import { ButtonSelect, stylesFactory, useTheme } from '@grafana/ui';

const helpOptions = [
  { value: 0, label: 'Documentation', href: 'https://grafana.com/docs/grafana/latest/' },
  { value: 1, label: 'Tutorials', href: 'https://grafana.com/tutorials/' },
  { value: 2, label: 'Community', href: 'https://community.grafana.com/' },
  { value: 3, label: 'Public Slack', href: '' },
];

export const WelcomeBanner = () => {
  const styles = getStyles(useTheme());

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Grafana</h1>
      <div className={styles.help}>
        <h3 className={styles.helpText}>Need help?</h3>
        <div className={styles.smallScreenHelp}>
          <ButtonSelect
            defaultValue={helpOptions[0]}
            variant="secondary"
            size="sm"
            onChange={onHelpLinkClick}
            options={helpOptions}
          />
        </div>
        <div className={styles.helpLinks}>
          {helpOptions.map((option, index) => {
            return (
              <a key={`${option.label}-${index}`} className={styles.helpLink} href={option.href}>
                {option.label}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const onHelpLinkClick = (option: { label: string; href: string }) => {
  window.open(option.href, '_blank');
};

const getStyles = stylesFactory((theme: GrafanaTheme) => {
  const backgroundImage = theme.isDark
    ? 'public/img/login_background_dark.svg'
    : 'public/img/login_background_light.svg';

  return {
    container: css`
      display: flex;
      background: url(${backgroundImage}) no-repeat;
      background-size: cover;
      height: 100%;
      align-items: center;
      padding: 0 50px 0 140px;
      justify-content: space-between;

      @media only screen and (max-width: ${theme.breakpoints.md}) {
        padding: 0 24px 0 100px;
        background-position: 0px;
      }
      @media only screen and (max-width: ${theme.breakpoints.sm}) {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding: ${theme.spacing.md} ${theme.spacing.md} ${theme.spacing.md} 48px;
      }
    `,
    title: css`
      @media only screen and (max-width: ${theme.breakpoints.md}) {
        font-size: ${theme.typography.heading.h2};
      }
      @media only screen and (max-width: ${theme.breakpoints.sm}) {
        font-size: ${theme.typography.heading.h3};
      }
    `,
    help: css`
      display: flex;
      align-items: baseline;
    `,
    helpText: css`
      margin-right: ${theme.spacing.md};

      @media only screen and (max-width: ${theme.breakpoints.md}) {
        font-size: ${theme.typography.heading.h4};
      }

      @media only screen and (max-width: ${theme.breakpoints.sm}) {
        display: none;
      }
    `,
    helpLinks: css`
      margin-left: 24px;

      @media only screen and (max-width: ${theme.breakpoints.lg}) {
        display: none;
      }
    `,
    helpLink: css`
      margin-left: 16px;
      text-decoration: underline;
    `,
    smallScreenHelp: css`
      @media only screen and (min-width: ${theme.breakpoints.lg}) {
        display: none;
      }
    `,
  };
});
