import React from "react";

import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";

const SignIn = () => {
  return (
    <div className="mt-8">
      <div>
        <h3 className="text-2xl font-bold">Comment utiliser cet outil ?</h3>
        <p>
          Une fois connecté,ajoutez simplement vos cartes dans le panneau{" "}
          <i>Cartes</i>, elles seront sauvés sur votre compte. La liste des
          livres associés aux différentes cartes va ensuite s'afficher dans la
          section <i>Livres</i>, ordonnés par date de retour. Il est possible de
          prolonger un livre en cliquant sur la petite icone correspondante(
          <svg
            className="h-6 w-6 text-gray-500 hover:text-gray-800 inline"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
          ). Un message s'affichera pour vous informer de la bonne réussite de
          l'opération (ou d'une impossibilité si reservé ou autre).
        </p>
        <p>
          J'ai créé cet outil pour gérer les 5 cartes de la famille avec
          efficacité
          <span role="img" aria-label="image">
            {" "}
            ⚙️👌
          </span>
        </p>
        <p>
          Cette application n'a aucun lien avec la ville de Montréal et le
          réseau de bibilothèques de la ville. L'application utilise les
          identifications uniquement pour interagir directement avec le
          catalogue
          <a
            className="text-teal-900 font-extrabold"
            target="_blank"
            rel="noreferrer"
            href="https://nelligan.ville.montreal.qc.ca"
          >
            {" "}
            Nelligan
          </a>
          .
        </p>
      </div>
      <h1 className="text-3xl mb-2 text-center font-bold">Sign In</h1>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        <button
          className="bg-red-500 hover:bg-red-600 w-full py-2 text-white"
          onClick={() =>
            Auth.federatedSignIn({
              provider: CognitoHostedUIIdentityProvider.Google,
            })
          }
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};
export default SignIn;
