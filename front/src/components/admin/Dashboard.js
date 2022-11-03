import React, { Fragment } from 'react'
import Sidebar from './Sidebar'
import MetaData from '../layout/MetaData'
import { Link } from 'react-router-dom'

export const Dashboard = () => {
    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <h1 className="my-4">Informes</h1>

                        <Fragment>
                            <MetaData title={'Administracion'} />


                            {/*No 1 Informe de ventas totales a la fecha */}
                            <div className="row pr-4">
                                <div className="col-xl-12 col-sm-12 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Ventas Totales Mes<br /> <b>$2.000.000</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*No 2 Informe de Productos Registrados a la fecha */}
                            <div className="row pr-4">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Productos Registrados<br /> <b>123</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                            <span className="float-left">Ver Detalles</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                {/*No 3 Informe de Pedidos a la fecha */}
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-info o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Pedidos Totales<br /> <b>34</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                            <span className="float-left">Ver Detalles</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                {/*No 4 Informe de Usuarios Registrados a la fecha */}
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-warning o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Usuarios Registrados<br /> <b>12</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                            <span className="float-left">Ver Detalles</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                {/*No 5 Informe de Productos Agotados*/}
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Productos Agotados<br /> <b>20</b></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    

                </div>
            </div>

        </Fragment >
    )
}


    


export default Dashboard