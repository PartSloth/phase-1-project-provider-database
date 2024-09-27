# MEDICAL HEALTHCARE SOLUTION

Medical Healthcare Solution is a medical provider registry interface that allows users to search through a registry of medical providers pulled from the National Plan & Provider Enumeration System API [NPPES](https://npiregistry.cms.hhs.gov/api-page). Results reflect the provider's most recent information including specializations, place of work, contact information, and a list of insurance coverage. Providers within this registry must have a registered NPI (National Provider Identifier) number which is a 10-digit number that is HIPAA standard to identify providers to their health care partners and to conduct transactions with Medicare and other health plans.

- Search by: Zip Code, First Name, Last Name
- Filter results by gender and/or Medicaid coverage

## Installation
To install this project, you will need to have on your machine:

[![Static Badge](https://img.shields.io/badge/node.js-j?style=flat)](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)

**ExpressJS**

*API used to communicate with the NPPES API.*

Run the following commands:

```
# Setup package.json file.
$ npm init -y

# Install Express library.
$ npm i express

# Run the application.
$ npm run devStart
```

## Usage

Demo video [here.](https://youtu.be/MrvJ5q61cbs)
[![image.png](https://i.postimg.cc/XqNwzqhW/image.png)](https://postimg.cc/jw9wWxt3)

On run, this is the static webpage that will be locally hosted. This is a preview of how the page could look if used for insurance/medical companies to showcase providers in-network, nearby, and/or referred.

[![image.png](https://i.postimg.cc/kgnYhGS2/image.png)](https://postimg.cc/MvFYnWdw)

Below are the search fields, sort checkboxes, and provider cards that are displayed per search. Each search will yield the first 50 results from the NPPES API.

[![image.png](https://i.postimg.cc/HnrdM3YC/image.png)](https://postimg.cc/T5vzMV5k)

## Roadmap

![Static Badge](https://img.shields.io/badge/02%2F07%2F24-blue)

Future implementations:

1. At the current moment, there is a possiblity that the search can stall which results in delayed display of results. A message asking the user to attempt submission again would be helpful.
2. Add additional insurance provider options for sorting.
3. Add additional fields for searching.
4. Add pagination to pull a maximum of 200 results but only display a decided amount.
    1. Add function for page display count (10, 25, 50 results at a time).
5. Add a rating/comment function per provider.
    1. Add sort by: rating.

## Image Sources
[Webpage Main Image](https://www.intelligentcio.com/north-america/2020/07/21/norton-healthcare-achieves-hipaa-compliance-and-scales-telehealth-offerings-with-beyondtrust-2/)

[Woman Doctor](https://www.rawpixel.com/image/13188551/png-healthcare-doctor-female-adult-generated-image-rawpixel)

[Male Doctor](https://www.rawpixel.com/image/13188686/png-healthcare-doctor-glasses-adult-generated-image-rawpixel)

## License

[MIT](https://choosealicense.com/licenses/mit/)
